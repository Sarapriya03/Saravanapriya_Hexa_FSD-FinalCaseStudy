using AppUI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;

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

        [NonAction] // This method is not an action method, it is used internally to get the HttpClient
        public HttpClient GetClient()
        {
            var client = _httpClientFactory.CreateClient("ApiClient");

            var token = HttpContext.Session.GetString("jwttoken");
            if (!string.IsNullOrEmpty(token))
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }

            return client;
        }


        [HttpGet("")]
        [HttpGet("LoginPage")] // This route will match both the root and LoginPage
        public IActionResult LoginPage()
        {
            return View();
        }

        [HttpPost]
        [Route("ValidateUser", Name = "ValidateUser")] // Explicitly define the route for this action
        public async Task<IActionResult> LoginPage(User user) // ValidateUser(User user)
        {
            var client = GetClient();
            var response = await client.PostAsJsonAsync($"api/v1.0/User/ValidateUser", user);

            if (response.IsSuccessStatusCode)
            {
                var tokenJson = await response.Content.ReadAsStringAsync();

                // Deserialize correctly based on API return
                var tokenObj = JsonSerializer.Deserialize<Dictionary<string, string>>(tokenJson);

                if (tokenObj != null && tokenObj.ContainsKey("token"))
                {
                    var token = tokenObj["token"];
                    HttpContext.Session.SetString("jwttoken", token);
                    return RedirectToAction("HomePanel");
                }
                else
                {
                    ViewBag.Error = "Token not found in response.";
                    return View();
                }
            }

            ViewBag.Error = "Invalid login attempt.";
            return View();
        }

        [HttpGet("HomePanel")]
        public IActionResult HomePanel() // This route will match HomePanel
        {
            return View();
        }

        [HttpGet("Dashboard")]
        public async Task<IActionResult> Dashboard() // This route will match Dashboard
        {
            var client = GetClient();
            var employees = await client.GetFromJsonAsync<List<Employee>>("api/v8.0/Employee/GetAll");
            var payrolls = await client.GetFromJsonAsync<List<Payroll>>("api/v4.0/Payroll/GetAll");
            ViewBag.PayrollCount = payrolls?.Count ?? 0;
            return View(employees);
        }

        [HttpGet("Users")]
        public async Task<IActionResult> Users() // This route will match Users
        {
            var client = GetClient();
            var users = await client.GetFromJsonAsync<List<User>>("api/v1.0/User/GetAll");
            return View(users);
        }

        [HttpGet("CreateUser")] 
        public IActionResult CreateUser() => View();

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser(User user) // This route will match CreateUser
        {
            var client = GetClient();
            var res = await client.PostAsJsonAsync("api/v1.0/User/Add", user);
            if (res.IsSuccessStatusCode)
                return RedirectToAction("Users");

            ModelState.AddModelError("", "Failed to create user.");
            return View(user);
        }

        [HttpGet("PayrollConfig")]
        public async Task<IActionResult> PayrollConfig() // This route will match PayrollConfig
        {
            var client = GetClient();
            var configs = await client.GetFromJsonAsync<List<PayrollConfig>>("api/v5.0/PayrollConfig/GetAll");
            return View(configs);
        }

        [HttpGet("CreatePayrollConfig")] 
        public IActionResult CreatePayrollConfig() => View();

        [HttpPost("CreatePayrollConfig")]
        public async Task<IActionResult> CreatePayrollConfig(PayrollConfig config) // This route will match CreatePayrollConfig
        {
            var client = GetClient();
            var res = await client.PostAsJsonAsync("api/v5.0/PayrollConfig/AddorUpdate", config);
            if (res.IsSuccessStatusCode)
                return RedirectToAction("PayrollConfig");

            ModelState.AddModelError("", "Failed to add config.");
            return View(config);
        }

        [HttpGet("Employees")]
        public async Task<IActionResult> Employees() // This route will match Employees
        {
            var client = GetClient();
            var employees = await client.GetFromJsonAsync<List<Employee>>("api/v8.0/Employee/GetAll");
            return View(employees);
        }

        [HttpGet("CreateEmployee")]
        public IActionResult CreateEmployee() => View();

        [HttpPost("CreateEmployee")]
        public async Task<IActionResult> CreateEmployee(Employee emp) // This route will match CreateEmployee
        {
            var client = GetClient();
            var res = await client.PostAsJsonAsync("api/v8.0/Employee/Add", emp);
            if (res.IsSuccessStatusCode)
                return RedirectToAction("Employees");

            ModelState.AddModelError("", "Failed to create employee.");
            return View(emp);
        }

        [HttpGet("ComplianceReports")]
        public async Task<IActionResult> ComplianceReports() // This route will match ComplianceReports
        {
            var client = GetClient();
            var reports = await client.GetFromJsonAsync<List<string>>("api/v3.0/Report/GetComplianceReports");
            return View(reports);
        }

        [HttpGet("Notifications")]
        public async Task<IActionResult> Notifications() // This route will match Notifications
        {
            var client = GetClient();
            var notes = await client.GetFromJsonAsync<List<Notification>>("api/v6.0/Notification/GetAll");
            return View(notes);
        }

        [HttpGet("AuditTrail")]
        public async Task<IActionResult> AuditTrail() // This route will match AuditTrail
        {
            var client = GetClient();
            var logs = await client.GetFromJsonAsync<List<AuditLog>>("api/v10.0/AuditLog/GetAll");
            return View(logs);
        }
    }
}
