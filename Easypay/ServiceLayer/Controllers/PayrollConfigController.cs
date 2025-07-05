using DAL.DataAccess;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

//[Authorize(Roles = "Admin")]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class PayrollConfigController : ControllerBase
{
    private readonly IPayrollConfigRepo<PayrollConfig> _repo;

    public PayrollConfigController(IPayrollConfigRepo<PayrollConfig> repo)
    {
        _repo = repo;
    }

    [HttpPost("AddorUpdate")]
    public IActionResult AddOrUpdate(PayrollConfig config)
    {
        var result = _repo.AddOrUpdateConfig(config);
        return Ok(result);
    }

    [HttpGet("employee/{id}")]
    public IActionResult GetByEmployee(int id)
    {
        var result = _repo.GetConfigByEmployeeId(id);
        return Ok(result);
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        var result = _repo.GetAll();
        return Ok(result);
    }
}
