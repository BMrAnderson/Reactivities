namespace Domain;

public interface IRepository<T> where T : Entity
{
    Task<T[]> Get();
    Task<T> GetById(Guid id);
    Task Create(T entity);
    Task Update(T entity);
    Task Remove(T entity);
}