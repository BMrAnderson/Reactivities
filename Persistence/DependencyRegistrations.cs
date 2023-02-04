using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Persistence.EntityFrameworkCore;
using Domain;

namespace Persistence;

public static class DependencyRegistrations
{
    public static IServiceCollection RegisterInfrastructure(this IServiceCollection services)
    {
        services.AddTransient<IDbMigrator, EfCoreDbMigrator>();
        services.AddTransient<Seed>();
        services.AddTransient<IActivityRepository, ActivityRepository>();
        
        return services;
    }
}