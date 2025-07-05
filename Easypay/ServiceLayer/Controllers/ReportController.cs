using DAL.DataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ServiceLayer.Controllers
{
    //[Authorize(Roles = "Admin")]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepo _reportRepo;

        public ReportController(IReportRepo reportRepo)
        {
            _reportRepo = reportRepo;
        }

        [HttpGet("GetComplianceReports")]
        public IActionResult GetComplianceReports()
        {
            var reports = _reportRepo.GetComplianceReports();
            return Ok(reports);
        }
    }
}
