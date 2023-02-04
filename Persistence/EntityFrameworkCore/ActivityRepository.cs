using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence.EntityFrameworkCore;

public class ActivityRepository : IActivityRepository
{
    private readonly DataContext _context;

    public ActivityRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Activity[]> Get()
    {
        var result = await _context.Activities.AsNoTracking().ToArrayAsync();

        return result;
    }

    public async Task<Activity> GetById(Guid id)
    {
        var result = await _context.Activities.AsNoTracking().SingleAsync(s => s.Id == id);

        return result;
    }

    public async Task Create(Activity entity)
    {
        await _context.Activities.AddAsync(entity);
    }

    public async Task Update(Activity entity)
    {
        _context.Activities.Update(entity);
    }

    public async Task Remove(Activity entity)
    {
        _context.Activities.Remove(entity);
    }
}