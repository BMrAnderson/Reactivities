using Application.Abstractions;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class DependencyRegistrations
{
    public static IServiceCollection RegisterApplication(this IServiceCollection services)
    {
        services.AddTransient<IActivitiesService, ActivityService>();

        return services;
    }
}