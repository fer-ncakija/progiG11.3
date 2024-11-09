using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Apartmeet.Api.Data;
using Apartmeet.Api.Endpoints;
using Apartmeet.Api.Dtos;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("Apartmeet");
builder.Services.AddSqlite<ApartmeetContext>(connString);
builder.Services.AddAuthentication().AddJwtBearer(options => 
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]!))
    };
});
builder.Services.AddAuthorization();

var cid = builder!.Configuration["Authentication:Google:ClientId"];
var csec = builder!.Configuration["Authentication:Google:ClientSecret"];

builder.Services.AddAuthentication()
   .AddGoogle(googleOptions =>
    {
        googleOptions.ClientId = builder!.Configuration["Authentication:Google:ClientId"];
        googleOptions.ClientSecret = builder!.Configuration["Authentication:Google:ClientSecret"];
    });

var app = builder.Build();

app.MapPost("/login", async (LoginDto loginDto, ApartmeetContext context) => 
{
    if (string.IsNullOrWhiteSpace(loginDto.Username) || string.IsNullOrWhiteSpace(loginDto.Password))
    {
        return Results.BadRequest("Username and Password are required.");
    }

    var user = await context.Users
        .Where(u => u.Username == loginDto.Username)
        .Select(u => new UserLoginDto(u.Id, u.Username, u.Password, u.Role))
        .FirstOrDefaultAsync();

    if (user == null || user.Password != loginDto.Password)
    {
        return Results.Unauthorized();
    }

    var token = new JwtSecurityToken
    (
        issuer: builder.Configuration["Jwt:Issuer"],
        audience: builder.Configuration["Jwt:Audience"],
        claims: new List<Claim>
        {
                    new Claim("username", user.Username),
                    new Claim("customRole", user.Role)
        },
        expires: DateTime.Now.AddHours(1),
        signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]!)), SecurityAlgorithms.HmacSha256)
    );

    return Results.Ok(new {Token = new JwtSecurityTokenHandler().WriteToken(token)});
});

app.MapUserEndpoints();
app.MapMeetingEndpoints();
app.MapAgendaPointEndpoints();

app.MigrateDb();

app.Run();