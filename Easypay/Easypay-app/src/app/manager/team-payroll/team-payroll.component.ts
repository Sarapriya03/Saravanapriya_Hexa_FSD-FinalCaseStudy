import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PayrollProcessorService } from '../../services/payroll.service';
import { Payroll } from '../../models/payroll.model';

@Component({
  selector: 'app-team-payroll',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './team-payroll.component.html',
  styleUrl: './team-payroll.component.css'
})
export class TeamPayrollComponent {
  payrolls: Payroll[] = [];

  constructor(private payrollService: PayrollProcessorService) {}

  ngOnInit(): void {
    this.payrollService.getAllPayrolls().subscribe(data => {
      this.payrolls = data;
    });
  }
}
