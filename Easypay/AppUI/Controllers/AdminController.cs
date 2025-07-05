// 1. Dashboard
using AppUI.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppUI.Controllers
{
    [Route("Admin")]
    public class AdminController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AdminController(IHttpClientFactory httpClientFactory)
        {
            this._httpClientFactory = httpClientFactory;
        }

        [NonAction]
        public HttpClient GetClient()
        {
            var client = this._httpClientFactory.CreateClient("ApiClient");
            return client;
        }

        [HttpGet("Dashboard")]
        public async Task<IActionResult> Dashboard()
        {
            var client = GetClient();
            var employees = await client.GetFromJsonAsync<List<Employee>>("api/v1.0/Employee/GetAll");
            var payrolls = await client.GetFromJsonAsync<List<Payroll>>("api/v1.0/Payroll/GetAll");
            ViewBag.PayrollCount = payrolls?.Count ?? 0;
            return View(employees);
        }

        // 2. User Management
        [HttpGet("Users")]
        public async Task<IActionResult> Users()
        {
            var client = GetClient();
            var users = await client.GetFromJsonAsync<List<User>>("api/v1.0/User/GetAll");
            return View(users);
        }

        [HttpGet("CreateUser")]
        public IActionResult CreateUser()
        {
            return View();
        }

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser(User user)
        {
            var client = GetClient();
            var res = await client.PostAsJsonAsync("api/v1.0/User/Add", user);
            if (res.IsSuccessStatusCode)
                return RedirectToAction("Users");
            ModelState.AddModelError("", "Failed to create user.");
            return View(user);
        }

        // 3. Payroll Configuration
        [HttpGet("PayrollConfig")]
        public async Task<IActionResult> PayrollConfig()
        {
            var client = GetClient();
            var configs = await client.GetFromJsonAsync<List<PayrollConfig>>($"api/v1.0/PayrollConfig/GetAll");
            return View(configs);
        }


        [HttpGet("CreatePayrollConfig")]
        public IActionResult CreatePayrollConfig() => View();
        
        [HttpPost("CreatePayrollConfig")]
        public async Task<IActionResult> CreatePayrollConfig(PayrollConfig config)
        {
            var client = GetClient();
            var res = await client.PostAsJsonAsync("api/v1.0/PayrollConfig/AddorUpdate", config);
            if (res.IsSuccessStatusCode)
                return RedirectToAction("PayrollConfig");
            ModelState.AddModelError("", "Failed to add config.");
            return View(config);
        }

        // 4. Employee Management
        [HttpGet("Employees")]
        public async Task<IActionResult> Employees()
        {
            var client = GetClient();
            var employees = await client.GetFromJsonAsync<List<Employee>>("api/v1.0/Employee/GetAll");
            return View(employees);
        }

        [HttpGet("CreateEmployee")]
        public IActionResult CreateEmployee() => View();

        [HttpPost("CreateEmployee")]
        public async Task<IActionResult> CreateEmployee(Employee emp)
        {
            var client = GetClient();
            var res = await client.PostAsJsonAsync("api/v1.0/Employee/Add", emp);
            if (res.IsSuccessStatusCode)
                return RedirectToAction("Employees");
            ModelState.AddModelError("", "Failed to create employee.");
            return View(emp);
        }

        // 5. Compliance Reporting
        [HttpGet("ComplianceReports")]
        public async Task<IActionResult> ComplianceReports()
        {
            var client = GetClient();
            var reports = await client.GetFromJsonAsync<List<string>>("api/v1.0/Report/GetComplianceReports");
            return View(reports);
        }

        // 6. Notification Center
        [HttpGet("Notifications")]
        public async Task<IActionResult> Notifications()
        {
            var client = GetClient();
            var notes = await client.GetFromJsonAsync<List<Notification>>("api/v1.0/Notification/GetAll");
            return View(notes);
        }

        // 7. Audit Trail
        [HttpGet("AuditTrail")]
        public async Task<IActionResult> AuditTrail()
        {
            var client = GetClient();
            var logs = await client.GetFromJsonAsync<List<AuditLog>>("api/v1.0/AuditLog/GetAll");
            return View(logs);
        }
    }
}
