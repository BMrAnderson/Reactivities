namespace Application.Abstractions;

public class RemoveActivityRequest
{
    public Guid Id { get; set; }
 
    public RemoveActivityRequest(Guid id)
    {
        Id = id;
    }
}