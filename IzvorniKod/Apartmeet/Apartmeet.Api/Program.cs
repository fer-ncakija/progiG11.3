using Apartmeet.Api.Data;
using Apartmeet.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("Apartmeet");
builder.Services.AddSqlite<ApartmeetContext>(connString);

var app = builder.Build();

// Map endpoints
app.MapUserEndpoints();
app.MapMeetingEndpoints();
app.MapAgendaPointEndpoints();

app.MigrateDb();

app.Run();