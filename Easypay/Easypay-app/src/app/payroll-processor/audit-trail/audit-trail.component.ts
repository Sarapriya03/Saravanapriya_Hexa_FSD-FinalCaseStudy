import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuditLogService } from '../../services/audit-log.service';
import { AuditLog } from '../../models/audit-log.model';

@Component({
  selector: 'app-audit-trail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.css']
})
export class AuditTrailComponent implements OnInit {
  logs: AuditLog[] = [];

  constructor(private auditService: AuditLogService) {} // ✅ renamed for clarity

  ngOnInit(): void {
    this.auditService.getAllLogs().subscribe({
      next: (data: AuditLog[]) => {
        this.logs = data;
      },
      error: (err) => {
        console.error('Failed to load audit logs:', err);
      }
    });
  }
}
