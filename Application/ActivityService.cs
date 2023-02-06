using Application.Abstractions;
using Application.Exceptions;
using Application.Mappers;
using Domain;

namespace Application;

public class ActivityService : IActivitiesService
{
    private readonly IActivityRepository _activityRepository;

    public ActivityService(IActivityRepository activityRepository)
    {
        _activityRepository = activityRepository;
    }

    public async Task<GetActivitiesResponse> Get()
    {
        var activities = await _activityRepository.Get();
        var result     = ActivityServiceMapper.Map(activities);

        return new GetActivitiesResponse(result);
    }
    
    public async Task<GetActivityResponse> Get(GetActivityRequest request)
    {
        ArgumentNullException.ThrowIfNull(request, nameof(request));
        var activity = await _activityRepository.GetById(request.Id);
        var result   = ActivityServiceMapper.Map(activity);

        return result;
    }

    public async Task Edit(EditActivityRequest request)
    {
        ArgumentNullException.ThrowIfNull(request, nameof(request));
        var activity = ActivityServiceMapper.Map(request);
        await _activityRepository.Update(activity);
        await _activityRepository.SaveAsync();
    }

    public async Task<CreateActivityResponse> Create(CreateActivityRequest request)
    {
        ArgumentNullException.ThrowIfNull(request, nameof(request));
        var activity = ActivityServiceMapper.Map(request);
        var idResult = await _activityRepository.Create(activity);
        await _activityRepository.SaveAsync();

        return new CreateActivityResponse(idResult);
    }

    public async Task Remove(RemoveActivityRequest request)
    {
        ArgumentNullException.ThrowIfNull(request, nameof(request));
        var activity = await _activityRepository.GetById(request.Id);
        if (activity == null)
            throw new EntityNotFoundException(request.Id,
                                              $"Activity with requested Id:[{request.Id}] could not be found.");
        await _activityRepository.Remove(activity);
        await _activityRepository.SaveAsync();
    }
}