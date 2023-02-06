namespace Application.Abstractions;

public class CreateActivityResponse
{
    public Guid Id { get; set; }

    public CreateActivityResponse(Guid id)
    {
        Id = id;
    }
}