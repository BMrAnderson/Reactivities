namespace Application.Exceptions;

public class EntityNotFoundException : Exception
{
    public Guid EntityIdNotFound { get; }

    public EntityNotFoundException(Guid entityIdNotFound, string message) : base(message)
    {
        EntityIdNotFound = entityIdNotFound;
    }
}