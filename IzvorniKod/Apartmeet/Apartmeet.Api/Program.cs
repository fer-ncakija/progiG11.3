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

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("Apartmeet");
builder.Services.AddSqlite<ApartmeetContext>(connString);

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

app.MapPost("/oauth2/token", async (AuthCodeDto authCode) => 
{
    using var client = new HttpClient();

    var formData = new List<KeyValuePair<string, string>>
    {
        new KeyValuePair<string, string>("code", authCode.code),
        new KeyValuePair<string, string>("client_id", builder.Configuration["Authentication:Google:ClientId"]!),
        new KeyValuePair<string, string>("client_secret", builder.Configuration["Authentication:Google:ClientSecret"]!),
        new KeyValuePair<string, string>("redirect_uri", "http://localhost:3000"),
        new KeyValuePair<string, string>("grant_type", "authorization_code")
    };

    var content = new FormUrlEncodedContent(formData);

    try
    {
        var response = await client.PostAsync("https://oauth2.googleapis.com/token", content);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Error response: {errorContent}");
            return Results.BadRequest(new { error = "Failed to obtain token from Google" });
        }

        var responseContent = await response.Content.ReadAsStringAsync();
        Console.WriteLine(responseContent);
        var tokenResponse = JsonSerializer.Deserialize<GoogleTokenResponseDto>(responseContent);

        return Results.Ok(tokenResponse);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
        return Results.BadRequest(new { error = "An error occurred while obtaining Google token"});
    }
});

app.MapUserEndpoints();
app.MapMeetingEndpoints();
app.MapAgendaPointEndpoints();

app.MigrateDb();
app.Run();