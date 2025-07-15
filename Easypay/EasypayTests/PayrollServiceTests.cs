using Moq;
using System;
using DAL;
using DAL.DataAccess;
using DAL.Models;
using NUnit.Framework;

namespace EasypayTests
{
    [TestFixture] // Indicates that this class contains tests
    public class PayrollServiceTests
    {
        private Mock<IPayrollRepo<Payroll>> _mockRepo;
        private PayrollService _service;

        [SetUp] // This method runs before each test
        public void Setup()
        {
            _mockRepo = new Mock<IPayrollRepo<Payroll>>();
            _service = new PayrollService(_mockRepo.Object);
        }

        [Test] // Test method to check if the Generate method works correctly
        public void Generate_ShouldReturnGeneratedPayroll()
        {
            var payroll = new Payroll { PayrollId = 1, Salary = 5000, Bonus = 500, Deductions = 200 };
            _mockRepo.Setup(r => r.GeneratePayroll(payroll)).Returns(payroll);

            var result = _service.Generate(payroll);

            Assert.AreEqual(1, result.PayrollId); 
            _mockRepo.Verify(r => r.GeneratePayroll(payroll), Times.Once);
        }

        [Test] // Test method to check if the Add method works correctly
        public void Add_ShouldReturnAddedPayroll()
        {
            var payroll = new Payroll { PayrollId = 2 };
            _mockRepo.Setup(r => r.AddPayroll(payroll)).Returns(payroll);

            var result = _service.Add(payroll);
            Assert.AreEqual(2, result.PayrollId);
            _mockRepo.Verify(r => r.AddPayroll(payroll), Times.Once);
        }

        [Test] // Test method to check if the Update method works correctly
        public void Update_ShouldReturnUpdatedPayroll()
        {
            var payroll = new Payroll { PayrollId = 3 };
            _mockRepo.Setup(r => r.UpdatePayroll(payroll)).Returns(payroll);

            var result = _service.Update(payroll);
            Assert.AreEqual(3, result.PayrollId);
            _mockRepo.Verify(r => r.UpdatePayroll(payroll), Times.Once);
        }

        [Test] // Test method to check if the Delete method works correctly
        public void Delete_ShouldReturnDeletedPayroll()
        {
            var payroll = new Payroll { PayrollId = 4 };
            _mockRepo.Setup(r => r.DeletePayroll(payroll)).Returns(payroll);

            var result = _service.Delete(payroll);
            Assert.AreEqual(4, result.PayrollId);
            _mockRepo.Verify(r => r.DeletePayroll(payroll), Times.Once);
        }

        [Test] // Test method to check if the GetById method works correctly
        public void GetByEmployeeId_ShouldReturnPayrolls()
        {
            var employeeId = 1;
            var payrolls = new List<Payroll> { new Payroll { PayrollId = 5, EmployeeId = 1 } };
            _mockRepo.Setup(r => r.GetPayrollsByEmployeeId(employeeId)).Returns(payrolls);

            var result = _service.GetByEmployeeId(employeeId);
            Assert.AreEqual(1, result.Count);
            _mockRepo.Verify(r => r.GetPayrollsByEmployeeId(employeeId), Times.Once);
        }

        [Test] // Test method to check if the GetAll method works correctly
        public void GetAll_ShouldReturnAllPayrolls()
        {
            var payrolls = new List<Payroll> { new Payroll { PayrollId = 6 }, new Payroll { PayrollId = 7 } };
            _mockRepo.Setup(r => r.GetAllPayrolls()).Returns(payrolls);

            var result = _service.GetAll();
            Assert.AreEqual(2, result.Count);
            _mockRepo.Verify(r => r.GetAllPayrolls(), Times.Once);
        }

        [Test] // Test method to check if the Verify method works correctly
        public void Verify_ShouldReturnVerifiedPayroll()
        {
            var payroll = new Payroll { PayrollId = 8 };
            _mockRepo.Setup(r => r.VerifyPayroll(8)).Returns(payroll);

            var result = _service.Verify(8);
            Assert.AreEqual(8, result.PayrollId);
            _mockRepo.Verify(r => r.VerifyPayroll(8), Times.Once);
        }
    }
}

