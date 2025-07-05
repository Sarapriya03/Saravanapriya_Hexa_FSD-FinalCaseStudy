using DAL.DataAccess;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

//[Authorize(Roles = "Admin")]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class BenefitController : ControllerBase
{
    private readonly IBenefitRepo<Benefit> _repo;

    public BenefitController(IBenefitRepo<Benefit> repo)
    {
        _repo = repo;
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        var result = _repo.GetAllBenefits();
        return Ok(result);
    }

    [HttpPost("Add")]
    public IActionResult Add(Benefit benefit)
    {
        var result = _repo.AddBenefit(benefit);
        return Ok(result);
    }

    [HttpPut("Update")]
    public IActionResult Update(Benefit benefit)
    {
        var result = _repo.UpdateBenefit(benefit);
        return Ok(result);
    }

    [HttpDelete("Delete")]
    public IActionResult Delete(Benefit benefit)
    {
        var result = _repo.DeleteBenefit(benefit);
        return Ok(result);
    }
}
