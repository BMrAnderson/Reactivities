namespace Application.Abstractions;

public class GetActivityRequest
{
    public Guid Id { get; set; }

    public GetActivityRequest(Guid id)
    {
        Id = id;
    }
}