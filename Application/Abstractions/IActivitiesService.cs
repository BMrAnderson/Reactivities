namespace Application.Abstractions;

public interface IActivitiesService
{
    Task<GetActivitiesResponse> Get();
    Task<GetActivityResponse> Get(GetActivityRequest request);
    Task Edit(EditActivityRequest request);
    Task<CreateActivityResponse> Create(CreateActivityRequest request);
    Task Remove(RemoveActivityRequest request);
}
