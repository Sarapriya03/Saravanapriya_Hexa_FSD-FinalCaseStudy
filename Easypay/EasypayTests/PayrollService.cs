using System;
using DAL.DataAccess;
using DAL.Models;

namespace EasypayTests
{ 
        public class PayrollService
        {
            private readonly IPayrollRepo<Payroll> _repo;

            public PayrollService(IPayrollRepo<Payroll> repo)
            {
                _repo = repo;
            }

            public Payroll Generate(Payroll payroll) => _repo.GeneratePayroll(payroll);
            public Payroll Add(Payroll payroll) => _repo.AddPayroll(payroll);
            public Payroll Update(Payroll payroll) => _repo.UpdatePayroll(payroll);
            public Payroll Delete(Payroll payroll) => _repo.DeletePayroll(payroll);
            public List<Payroll> GetByEmployeeId(int employeeId) => _repo.GetPayrollsByEmployeeId(employeeId);
            public List<Payroll> GetAll() => _repo.GetAllPayrolls();
            public Payroll Verify(int payrollId) => _repo.VerifyPayroll(payrollId);
        }
}

