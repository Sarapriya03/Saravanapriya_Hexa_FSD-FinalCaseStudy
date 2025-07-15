import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PayrollProcessorService } from '../../services/payroll.service';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './processor-notifications.component.html',
  styleUrl: './processor-notifications.component.css'
})
export class ProcessorNotificationsComponent {
  notes: Notification[] = [];

  constructor(private payrollService: PayrollProcessorService) {}

  ngOnInit(): void {
    this.payrollService.getNotifications().subscribe(data => this.notes = data);
  }
}
