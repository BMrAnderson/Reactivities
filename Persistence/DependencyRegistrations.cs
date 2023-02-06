using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Persistence.EntityFrameworkCore;
using Domain;
using Microsoft.Extensions.Configuration;

namespace Persistence;

public static class DependencyRegistrations
{
    public static IServiceCollection RegisterInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<DataContext>(d => d.UseSqlite(configuration.GetConnectionString("Default")));
        services.AddTransient<IDbMigrator, EfCoreDbMigrator>();
        services.AddTransient<Seed>();
        services.AddTransient<IActivityRepository, ActivityRepository>();
        
        return services;
    }
}