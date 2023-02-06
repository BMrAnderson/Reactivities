using Application.Abstractions;
using Domain;

namespace Application.Mappers;

public static class ActivityServiceMapper
{
    public static GetActivityResponse Map(Activity activity)
    {
        var result = new GetActivityResponse
        {
            Title       = activity.Title,
            Description = activity.Description,
            Category    = activity.Category,
            Venue       = activity.Venue,
            City        = activity.City,
            Date        = activity.Date
        };
        return result;
    }

    public static GetActivitiesResponse.Activity[] Map(Activity[] activities)
    {
        var result = activities.Select(MapSingle).ToArray();

        return result;
    }

    public static Activity Map(EditActivityRequest request)
    {
        var result = new Activity
        {
            Id          = request.Id,
            Title       = request.Title,
            Description = request.Description,
            Category    = request.Category,
            Venue       = request.Venue,
            City        = request.City,
            Date        = request.Date
        };
        return result;
    }

    public static Activity Map(CreateActivityRequest request)
    {
        var result = new Activity
        {
            Title       = request.Title,
            Description = request.Description,
            Category    = request.Category,
            Venue       = request.Venue,
            City        = request.City,
            Date        = request.Date
        };
        return result;
    }

    private static GetActivitiesResponse.Activity MapSingle(Activity activity)
    {
        var result = new GetActivitiesResponse.Activity
        {
            Id          = activity.Id,
            Title       = activity.Title,
            Description = activity.Description,
            Category    = activity.Category,
            Venue       = activity.Venue,
            City        = activity.City,
            Date        = activity.Date
        };
        return result;
    }
}