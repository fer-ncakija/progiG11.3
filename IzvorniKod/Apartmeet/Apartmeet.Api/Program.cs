using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Apartmeet.Api.Data;
using Apartmeet.Api.Endpoints;
using Apartmeet.Api.Dtos;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration
.AddJsonFile("appsettings.User.json", optional: true, reloadOnChange: true);

builder.Services.AddCors(options => 
    {
        options.AddPolicy(name: "cors", policy => 
        {
            policy.WithOrigins("http://localhost:3000");
        });
    }
);
builder.Services.AddSqlite<ApartmeetContext>(builder.Configuration["ConnectionStrings:Apartmeet"]);
builder.Services.Configure<MailClientSettings>(builder.Configuration.GetSection("MailClient"));

builder.Services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<MailClientSettings>>().Value);

builder.Services.AddScoped<IAgendaService, AgendaService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMailService, MailService>();


builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
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
    })
    .AddGoogle(googleOptions =>
    {
        googleOptions.ClientId = builder.Configuration["Authentication:Google:ClientId"]!;
        googleOptions.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"]!;
    });

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors("cors");
app.UseAuthentication();
app.UseAuthorization();

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

app.MapPost("/oauth2/token", async (AuthCodeDto authCode, ApartmeetContext context) =>
{
    try
    {
        var response = await new HttpClient().PostAsync("https://oauth2.googleapis.com/token", new FormUrlEncodedContent(new Dictionary<string, string>
        {
            {"code", authCode.Code},
            {"client_id", builder.Configuration["Authentication:Google:ClientId"]!},
            {"client_secret", builder.Configuration["Authentication:Google:ClientSecret"]!},
            {"redirect_uri", "http://localhost:3000"},
            {"grant_type", "authorization_code"}
        }));

        var responseContent = await response.Content.ReadAsStringAsync();

        var tokenResponse = JsonSerializer.Deserialize<GoogleTokenResponseDto>(responseContent);

        if (tokenResponse == null || string.IsNullOrEmpty(tokenResponse.id_token))
        {
            return Results.BadRequest();
        }

        var userEmail = new JwtSecurityTokenHandler().ReadJwtToken(tokenResponse.id_token).Claims.First(c => c.Type == "email").Value;

        var user = await context.Users
            .Where(u => u.Email == userEmail)
            .Select(u => new UserLoginDto(u.Id, u.Username, u.Password, u.Role))
            .FirstOrDefaultAsync();

        if(user == null)
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
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
        return Results.BadRequest();
    }
});


app.MapUserEndpoints();
app.MapMeetingEndpoints();
app.MapAgendaPointEndpoints();
app.MapThreadEndpoints();

app.MigrateDb();
app.Run();