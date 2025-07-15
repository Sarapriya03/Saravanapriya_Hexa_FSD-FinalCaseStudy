import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notifications',
  standalone: true, // Include if using standalone components
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './empnotifications.component.html',
  styleUrls: ['./empnotifications.component.css']
})
export class EmpNotificationsComponent {
  notes: Notification[] = [];
  empId: number = Number(localStorage.getItem('empId'));

  constructor(private svc: EmployeeService) {}

  ngOnInit(): void {
    this.svc.getNotifications(this.empId).subscribe(data => {
      this.notes = data;
    });
  }
}
