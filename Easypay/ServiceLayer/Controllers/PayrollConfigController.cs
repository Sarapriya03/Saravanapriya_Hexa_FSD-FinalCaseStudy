using DAL.DataAccess;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[AllowAnonymous]
[ApiVersion("5.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class PayrollConfigController : ControllerBase
{
    private readonly IPayrollConfigRepo<PayrollConfig> _repo;

    public PayrollConfigController(IPayrollConfigRepo<PayrollConfig> repo) // Dependency Injection for the repository
    {
        _repo = repo;
    }

    [HttpPost("AddorUpdate")] // Endpoint to add or update payroll configuration
    public IActionResult AddOrUpdate(PayrollConfig config)
    {
        var result = _repo.AddOrUpdateConfig(config);
        return Ok(result);
    }

    [HttpGet("employee/{id}")] // Endpoint to get payroll configuration by employee ID
    public IActionResult GetByEmployee(int id)
    {
        var result = _repo.GetConfigByEmployeeId(id);
        return Ok(result);
    }

    [HttpGet("GetAll")] // Endpoint to get all payroll configurations
    public IActionResult GetAll()
    {
        var result = _repo.GetAll();
        return Ok(result);
    }
}
