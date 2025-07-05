using DAL.DataAccess;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

//[Authorize(Roles = "Admin,Manager")]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class LeaveRequestController : ControllerBase
{
    private readonly ILeaveRequestRepo<LeaveRequest> _repo;

    public LeaveRequestController(ILeaveRequestRepo<LeaveRequest> repo)
    {
        _repo = repo;
    }

    [HttpPost("Submit")]
    public IActionResult Submit(LeaveRequest req)
    {
        var result = _repo.SubmitLeaveRequest(req);
        return Ok(result);
    }

    [HttpPut("Approve")]
    public IActionResult ApproveOrReject(LeaveRequest req)
    {
        var result = _repo.ApproveOrRejectLeaveRequest(req);
        return Ok(result);
    }

    [HttpGet("employee/{id}")]
    public IActionResult GetByEmployee(int id)
    {
        var result = _repo.GetLeaveRequestsByEmployeeId(id);
        return Ok(result);
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        var result = _repo.GetAllLeaveRequests();
        return Ok(result);
    }
}
