import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { LeaveRequest } from '../../models/leave-request.model';

@Component({
  selector: 'app-leave-request',
  standalone: true, // Only if using standalone components
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent {
  request: LeaveRequest = {} as LeaveRequest;
  empId: number = Number(localStorage.getItem('empId'));

  constructor(private svc: EmployeeService) {
    this.request.employeeId = this.empId;
  }

  submit() {
    this.svc.submitLeaveRequest(this.request).subscribe(() => {
      alert('Leave request submitted');
      this.request = { employeeId: this.empId } as LeaveRequest;
    });
  }
}
