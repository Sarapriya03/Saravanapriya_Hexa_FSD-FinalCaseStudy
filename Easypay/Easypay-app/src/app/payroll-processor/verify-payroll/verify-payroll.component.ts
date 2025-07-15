import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PayrollProcessorService } from '../../services/payroll.service';
import { Payroll } from '../../models/payroll.model';

@Component({
  selector: 'app-verify-payroll',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './verify-payroll.component.html',
  styleUrl: './verify-payroll.component.css'
})
export class VerifyPayrollComponent {
  payrolls: Payroll[] = [];

  constructor(private payrollService: PayrollProcessorService) {}

  ngOnInit(): void {
    this.loadPayrolls();
  }

  loadPayrolls(): void {
    this.payrollService.getAllPayrolls().subscribe(data => {
      this.payrolls = data.filter(p => p.status === 'Pending');
    });
  }

  finalizePayroll(payroll: Payroll): void {
    const updatedPayroll: Payroll = {
      ...payroll,
      status: 'Finalized'
    };

    this.payrollService.updatePayroll(updatedPayroll).subscribe(() => {
      this.loadPayrolls();
    });
  }
}
