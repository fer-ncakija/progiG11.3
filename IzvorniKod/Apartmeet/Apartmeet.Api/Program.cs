using Apartmeet.Api.Data;
using Apartmeet.Api.Endpoints;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("Apartmeet");
builder.Services.AddSqlite<ApartmeetContext>(connString);

var cid = builder!.Configuration["Authentication:Google:ClientId"];
var csec = builder!.Configuration["Authentication:Google:ClientSecret"];

builder.Services.AddAuthentication()
   .AddGoogle(googleOptions =>
    {
        googleOptions.ClientId = builder!.Configuration["Authentication:Google:ClientId"];
        googleOptions.ClientSecret = builder!.Configuration["Authentication:Google:ClientSecret"];
    });

var app = builder.Build();

// Map endpoints
app.MapUserEndpoints();
app.MapMeetingEndpoints();
app.MapAgendaPointEndpoints();

app.MigrateDb();

app.Run();