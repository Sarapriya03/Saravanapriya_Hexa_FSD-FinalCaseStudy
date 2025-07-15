import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LeaveRequestService } from '../../services/leave-request.service';
import { LeaveRequest } from '../../models/leave-request.model';

@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent {
  leaveRequests: LeaveRequest[] = [];

  constructor(private leaveService: LeaveRequestService) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.leaveService.getAllLeaveRequests().subscribe(data => {
      this.leaveRequests = data.filter(l => l.status === 'Pending');
    });
  }

  updateLeaveStatus(leave: LeaveRequest, status: 'Approved' | 'Rejected'): void {
    const updatedLeave: LeaveRequest = {
      ...leave,
      status: status
    };

    this.leaveService.approveOrRejectLeave(updatedLeave).subscribe({
      next: () => this.loadLeaveRequests(),
      error: (err) => console.error(`${status} failed:`, err)
    });
  }
}
