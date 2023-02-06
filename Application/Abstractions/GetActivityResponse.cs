namespace Application.Abstractions;

public class GetActivityResponse
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string Venue { get; set; }
    public string City { get; set; }
    public DateTime Date { get; set; }
}