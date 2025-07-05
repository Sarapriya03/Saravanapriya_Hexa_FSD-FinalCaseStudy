using DAL.DataAccess;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

//[Authorize]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class NotificationController : ControllerBase
{
    private readonly INotificationRepo<Notification> _repo;

    public NotificationController(INotificationRepo<Notification> repo)
    {
        _repo = repo;
    }

    [HttpPost("Add")]
    public IActionResult Add(Notification notif)
    {
        var result = _repo.AddNotification(notif);
        return Ok(result);
    }

    [HttpGet("employee/{id}")]
    public IActionResult GetByEmployee(int id)
    {
        var result = _repo.GetNotificationsByEmployeeId(id);
        return Ok(result);
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        var result = _repo.GetAll();
        return Ok(result);
    }
}
