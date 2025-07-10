import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollService } from '../../services/payroll.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: Notification[] = [];

  constructor(private payrollService: PayrollService) {}

  ngOnInit(): void {
    this.payrollService.getNotifications().subscribe(data => this.notifications = data);
  }
}
