import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollService } from '../../services/payroll.service';
import { Payroll } from '../../models/payroll.model';

@Component({
  selector: 'app-verify-payroll',
  imports: [CommonModule],
  templateUrl: './verify-payroll.component.html',
  styleUrl: './verify-payroll.component.css'
})
export class VerifyPayrollComponent {
  payrolls: Payroll[] = [];

  constructor(private payrollService: PayrollService) {}

  ngOnInit(): void {
    this.loadPayrolls();
  }

  loadPayrolls(): void {
    this.payrollService.getPayrolls().subscribe(data => this.payrolls = data);
  }

  verify(id: number): void {
    this.payrollService.verifyPayroll(id).subscribe(() => {
      this.loadPayrolls();
    });
  }
}
