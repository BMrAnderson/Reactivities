using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    private readonly IActivityRepository _activities;
    
    public ActivitiesController(IActivityRepository activities)
    {
        _activities = activities;
    }

    [HttpGet]
    public async Task<ActionResult<Activity[]>> GetAll()
    {
        return await _activities.Get();
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Activity>> Get(Guid id)
    {
        return await _activities.GetById(id);
    }

}