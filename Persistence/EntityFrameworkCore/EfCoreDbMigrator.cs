using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Persistence.EntityFrameworkCore;

public class EfCoreDbMigrator : IDbMigrator
{
    private readonly DataContext _context;
    private readonly ILogger<EfCoreDbMigrator> _logger;

    public EfCoreDbMigrator(DataContext context, ILogger<EfCoreDbMigrator> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    public async Task Migrate()
    {
        try
        {
             await _context.Database.MigrateAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred running the database migrations.");
        }
    }
}