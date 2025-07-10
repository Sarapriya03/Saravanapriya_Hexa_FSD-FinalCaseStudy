import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PayrollService } from '../../services/payroll.service';
import { Payroll } from '../../models/payroll.model';

@Component({
  selector: 'app-process-payroll',
  imports: [CommonModule,FormsModule],
  templateUrl: './process-payroll.component.html',
  styleUrl: './process-payroll.component.css'
})
export class ProcessPayrollComponent {
  payroll: Payroll = { employeeId: 0, allowances: 0, deductions: 0 } as unknown as Payroll;

  constructor(private payrollService: PayrollService) {}

  submit(): void {
    this.payrollService.processPayroll(this.payroll).subscribe(() => {
      alert('Payroll processed successfully');
    });
  }
}
