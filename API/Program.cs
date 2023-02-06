using Application;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
// Add services to the container.
services.AddControllers();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.RegisterInfrastructure(builder.Configuration);
services.RegisterApplication();
services.AddCors(c =>
{
    c.AddPolicy("AllowClient", p =>
    {
        p.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowClient");

app.UseAuthorization();

app.MapControllers();

await ExecuteMigrator(app);

app.Run();

async Task ExecuteMigrator(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var sp = scope.ServiceProvider;
    var migrator = sp.GetService<IDbMigrator>();
    var seed = sp.GetService<Seed>();
   
    await migrator.Migrate();
    await seed.SeedData();
}