using DAL.DataAccess;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

//[Authorize(Roles = "Admin,Manager")]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeRepo<Employee> _repo;

    public EmployeeController(IEmployeeRepo<Employee> repo)
    {
        _repo = repo;
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        var result = _repo.GetAllEmployees();
        return Ok(result);
    }

    [HttpGet("{id}/GetById")]
    public IActionResult GetById(int id)
    {
        var result = _repo.GetEmployeeById(id);
        return Ok(result);
    }

    [HttpPost("Add")]
    public IActionResult Add(Employee emp)
    {
        var result = _repo.AddEmployee(emp);
        return Ok(result);
    }

    [HttpPut("Update")]
    public IActionResult Update(Employee emp)
    {
        var result = _repo.UpdateEmployee(emp);
        return Ok(result);
    }

    [HttpDelete("Delete")]
    public IActionResult Delete(Employee emp)
    {
        var result = _repo.DeleteEmployee(emp);
        return Ok(result);
    }
}
