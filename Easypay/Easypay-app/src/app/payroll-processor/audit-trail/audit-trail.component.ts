import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollService } from '../../services/payroll.service';
import { AuditLog } from '../../models/audit-log.model';

@Component({
  selector: 'app-audit-trail',
  imports: [CommonModule],
  templateUrl: './audit-trail.component.html',
  styleUrl: './audit-trail.component.css'
})
export class AuditTrailComponent {
  logs: AuditLog[] = [];

  constructor(private payrollService: PayrollService) {}

  ngOnInit(): void {
    this.payrollService.getAuditLogs().subscribe(data => this.logs = data);
  }
}
