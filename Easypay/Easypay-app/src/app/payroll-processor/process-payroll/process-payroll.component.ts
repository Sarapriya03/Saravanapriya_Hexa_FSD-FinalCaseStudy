import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PayrollProcessorService } from '../../services/payroll.service';
import { Payroll } from '../../models/payroll.model';

@Component({
  selector: 'app-process-payroll',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './process-payroll.component.html',
  styleUrl: './process-payroll.component.css'
})
export class ProcessPayrollComponent {
  payroll: Payroll = {
    payrollId: 0,
    employeeId: 0,
    salary: 0,
    bonus: 0,
    deductions: 0,
    netSalary: 0,
    payrollDate: new Date(),
    status: 'Pending'
  };

  constructor(private payrollService: PayrollProcessorService) {}

  submit(): void {
    // Optionally get employee ID from localStorage
    const empId = Number(localStorage.getItem('empId'));
    this.payroll.employeeId = empId > 0 ? empId : this.payroll.employeeId;

    // Basic sample salary logic (you can customize it)
    if (this.payroll.salary === 0) {
      this.payroll.salary = 50000; // Default salary
    }

    // Calculate net salary
    this.payroll.netSalary = this.payroll.salary + this.payroll.bonus - this.payroll.deductions;

    // Set current date
    this.payroll.payrollDate = new Date();

    // Default status
    this.payroll.status = 'Pending';

    // Debug
    console.log('Submitting payroll:', this.payroll);

    this.payrollService.generatePayroll(this.payroll).subscribe({
      next: () => alert('Payroll processed successfully'),
      error: err => console.error('Payroll submission failed:', err)
    });
  }
}
