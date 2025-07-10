import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollService } from '../../services/payroll.service';
import { Payroll } from '../../models/payroll.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  payrollCount = 0;

  constructor(private payrollService: PayrollService) {}

  ngOnInit(): void {
    this.payrollService.getPayrolls().subscribe(data => {
      this.payrollCount = data.length;
    });
  }
}
