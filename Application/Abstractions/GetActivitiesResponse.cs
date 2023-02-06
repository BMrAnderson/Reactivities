namespace Application.Abstractions;

public class GetActivitiesResponse
{
    public Activity[] Activities { get; set; }

    public GetActivitiesResponse()
    {
        Activities = Array.Empty<Activity>();
    }

    public GetActivitiesResponse(Activity[] activities)
    {
        Activities = activities;
    }
    
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Venue { get; set; }
        public string City { get; set; }
        public DateTime Date { get; set; }
    }
}