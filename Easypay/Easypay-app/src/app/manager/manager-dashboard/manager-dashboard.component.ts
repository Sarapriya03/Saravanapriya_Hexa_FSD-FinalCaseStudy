import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PayrollProcessorService } from '../../services/payroll.service';
import { LeaveRequestService } from '../../services/leave-request.service';
import { Payroll } from '../../models/payroll.model';
import { LeaveRequest } from '../../models/leave-request.model';

@Component({
  selector: 'app-manager-dashboard',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent {
teamPayrolls: Payroll[] = [];
  pendingLeaves: LeaveRequest[] = [];

  constructor(
    private payrollService: PayrollProcessorService,
    private leaveService: LeaveRequestService
  ) {}

  ngOnInit(): void {
    this.loadTeamPayrolls();
    this.loadPendingLeaves();
  }

  loadTeamPayrolls(): void {
  this.payrollService.getAllPayrolls().subscribe((data: any[]) => {
    this.teamPayrolls = data;
  });
}


  loadPendingLeaves(): void {
    this.leaveService.getLeaveRequestsByEmployee(10).subscribe(data => {
      this.pendingLeaves = data.filter(l => l.status === 'Pending');
    });
  }
}

