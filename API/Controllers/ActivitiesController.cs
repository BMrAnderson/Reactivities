using Application;
using Application.Abstractions;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    private readonly IActivitiesService  _activitiesService;
    
    public ActivitiesController(IActivitiesService activitiesService)
    {
        _activitiesService = activitiesService;
    }

    [HttpGet]
    public async Task<ActionResult<GetActivitiesResponse>> GetAll()
    {
        try
        {
            return await _activitiesService.Get();
        }
        catch (Exception e)
        {
            return NotFound(e);
        }

    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetActivityResponse>> Get(Guid id)
    {
        try
        {
            return await _activitiesService.Get(new GetActivityRequest(id));
        }
        catch (Exception e)
        {
            return NotFound(e);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody]CreateActivityRequest activity)
    {
        try
        {
            return Ok(await _activitiesService.Create(activity));
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPut]
    public async Task<ActionResult> Edit([FromBody] EditActivityRequest activity)
    {
        try
        {
            await _activitiesService.Edit(activity);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> Remove(Guid id)
    {
        try
        {
            await _activitiesService.Remove(new RemoveActivityRequest(id));
            return Ok();
        }
        catch (Exception e)
        {
            return NotFound(e);
        }
    }
}