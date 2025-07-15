import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PayrollProcessorService } from '../../services/payroll.service';
import { Payroll } from '../../models/payroll.model';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Only if this is a standalone component
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './processor-dashboard.component.html',
  styleUrls: ['./processor-dashboard.component.css']
})
export class ProcessorDashboardComponent implements OnInit {
  payrollCount = 0;

  constructor(private payrollService: PayrollProcessorService) {}

  ngOnInit(): void {
    this.payrollService.getAllPayrolls().subscribe(data => {
      this.payrollCount = data.length;
    });
  }
}
