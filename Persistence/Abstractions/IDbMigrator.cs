namespace Persistence;

public interface IDbMigrator
{
    Task Migrate();
}