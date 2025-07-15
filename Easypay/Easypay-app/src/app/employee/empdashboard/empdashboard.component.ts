import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PayrollConfig } from '../../models/payrollconfig.model';
import { PayrollProcessorService } from '../../services/payroll.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.css']
})
export class EmpDashboardComponent {
  payrollConfig?: PayrollConfig;
  empId: number = 10;
  errorMessage: string = '';

  constructor(private payrollService: PayrollProcessorService) {}

  ngOnInit(): void {
    this.payrollService.getAll().subscribe({
      next: (configs) => {
        this.payrollConfig = configs.find(c => c.employeeId === this.empId);
        if (!this.payrollConfig) {
          this.errorMessage = 'No payroll configuration found for this employee.';
        }
      },
      error: (err) => {
        console.error('Error fetching payroll config:', err);
        this.errorMessage = 'Unable to load payroll data.';
      }
    });
  }
}
