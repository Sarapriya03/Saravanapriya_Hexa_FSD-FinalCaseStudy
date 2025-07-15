using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;

namespace DAL.DataAccess
{
    public class PayrollRepo : IPayrollRepo<Payroll>
    {
        public Payroll GeneratePayroll(Payroll payroll)
        {
            // Business logic for payroll calculation can be expanded here
            payroll.PayrollDate = DateTime.Now;
            payroll.Salary = payroll.Salary + payroll.Bonus - payroll.Deductions;

            using (var dbContext = new EasypayContext())
            {
                dbContext.Payrolls.Add(payroll);
                dbContext.SaveChanges();
                return payroll;
            }
        }
        public Payroll AddPayroll(Payroll payroll)
        {
            using (var dbContext = new EasypayContext())
            {
                dbContext.Payrolls.Add(payroll);
                dbContext.SaveChanges();
                return payroll;
            }
        }

        public Payroll UpdatePayroll(Payroll payroll)
        {
            using (var dbContext = new EasypayContext())
            {
                var existing = dbContext.Payrolls.FirstOrDefault(p => p.PayrollId == payroll.PayrollId);
                if (existing != null)
                {
                    // ✅ Update all relevant fields
                    existing.Salary = payroll.Salary;
                    existing.Bonus = payroll.Bonus;
                    existing.Deductions = payroll.Deductions;
                    existing.NetSalary = payroll.NetSalary;
                    existing.PayrollDate = payroll.PayrollDate;
                    existing.Status = payroll.Status; // ✅ Important line to update Status

                    dbContext.SaveChanges(); // ✅ Save the changes
                }
                return existing;
            }
        }


        public Payroll DeletePayroll(Payroll payroll)
        {
            using (var dbContext = new EasypayContext())
            {
                var existing = dbContext.Payrolls.FirstOrDefault(p => p.PayrollId == payroll.PayrollId);
                if (existing != null)
                {
                    dbContext.Payrolls.Remove(existing);
                    dbContext.SaveChanges();
                }
                return existing;
            }
        }

        public List<Payroll> GetPayrollsByEmployeeId(int employeeId)
        {
            using (var dbContext = new EasypayContext())
            {
                return dbContext.Payrolls.Where(p => p.EmployeeId == employeeId).ToList();
            }
        }

        public List<Payroll> GetAllPayrolls()
        {
            using (var dbContext = new EasypayContext())
            {
                return dbContext.Payrolls.ToList();
            }
        }

        public Payroll VerifyPayroll(int payrollId)
        {
            using (var dbContext = new EasypayContext())
            {
                var existingPayroll = dbContext.Payrolls.FirstOrDefault(p => p.PayrollId == payrollId);
                if (existingPayroll == null)
                {
                    return null;
                }
                dbContext.SaveChanges();
                return existingPayroll;
            }
        }

    }
}
