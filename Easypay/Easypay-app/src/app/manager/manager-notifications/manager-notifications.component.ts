import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-manager-notifications',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './manager-notifications.component.html',
  styleUrl: './manager-notifications.component.css'
})
export class ManagerNotificationsComponent {
  notes: Notification[] = [];
  managerId = 2; // Replace with dynamic ID from AuthService

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getAllNotifications(this.managerId).subscribe(data => {
      this.notes = data;
    });
  }
}
