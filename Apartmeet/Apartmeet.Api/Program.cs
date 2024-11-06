using Apartmeet.Api.Data;
using Apartmeet.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);
/* builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>(); */
var connString = builder.Configuration.GetConnectionString("Apartmeet");
builder.Services.AddSqlite<ApartmeetContext>(connString);

var app = builder.Build();

// Map endpoints
app.MapUserEndpoints();
app.MapMeetingEndpoints();
app.MapAgendaPointEndpoints();

app.Run();