import { ApplicationConfig, provideZoneChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AuthGuard } from './auth.guards';

// Components
// Login
import { LoginComponent } from './login/login.component';

// Employee
import { HomeComponent } from './home/home.component';
import { EmpDashboardComponent } from './employee/empdashboard/empdashboard.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { LeaveRequestComponent } from './employee/leave-request/leave-request.component';
import { EmpNotificationsComponent } from './employee/empnotifications/empnotifications.component';
import { TimesheetsComponent } from './employee/timesheets/timesheets.component';

//Manager
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { TeamPayrollComponent } from './manager/team-payroll/team-payroll.component';
import { LeaveApprovalComponent } from './manager/leave-approval/leave-approval.component';
import { ManagerNotificationsComponent } from './manager/manager-notifications/manager-notifications.component';

//Payroll Processor
import { ProcessorHomeComponent } from './processor-home/processor-home.component';
import { ProcessorDashboardComponent } from './payroll-processor/processor-dashboard/processor-dashboard.component';
import { ProcessPayrollComponent } from './payroll-processor/process-payroll/process-payroll.component';
import { VerifyPayrollComponent } from './payroll-processor/verify-payroll/verify-payroll.component';
import { ProcessorNotificationsComponent } from './payroll-processor/processor-notifications/processor-notifications.component';
import { AuditTrailComponent } from './payroll-processor/audit-trail/audit-trail.component';

const myRoutes: Routes = [
  { path: '', component: LoginComponent }, // login is root

  // Employee Routes
  { path: 'home', component: HomeComponent, data: { expectedRole: 'Employee' }},
  { path: 'dashboard', component: EmpDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'Employee' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { expectedRole: 'Employee' } },
  { path: 'leave-request', component: LeaveRequestComponent, canActivate: [AuthGuard], data: { expectedRole: 'Employee' } },
  { path: 'notifications', component: EmpNotificationsComponent, canActivate: [AuthGuard], data: { expectedRole: 'Employee' } },
  { path: 'timesheets', component: TimesheetsComponent, canActivate: [AuthGuard], data: { expectedRole: 'Employee' } },

  // Manager Routes
  { path: 'manager-home', component: ManagerHomeComponent, canActivate: [AuthGuard], data: { expectedRole: 'Manager' } },
  { path: 'manager-dashboard', component: ManagerDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'Manager' } },
  { path: 'team-payroll', component: TeamPayrollComponent, canActivate: [AuthGuard], data: { expectedRole: 'Manager' } },
  { path: 'leave-approval', component: LeaveApprovalComponent, canActivate: [AuthGuard], data: { expectedRole: 'Manager' } },
  { path: 'manager-notifications', component: ManagerNotificationsComponent, canActivate: [AuthGuard], data: { expectedRole: 'Manager' } },

  // Payroll Processor Routes
  { path: 'processor-home', component: ProcessorHomeComponent, canActivate: [AuthGuard], data: { expectedRole: 'Payroll-Processor' }},
  { path: 'processor-dashboard', component: ProcessorDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'Payroll-Processor' }},
  { path: 'process-payroll', component: ProcessPayrollComponent, canActivate: [AuthGuard], data: { expectedRole: 'Payroll-Processor' }},
  { path: 'verify-payroll', component: VerifyPayrollComponent, canActivate: [AuthGuard], data: { expectedRole: 'Payroll-Processor' }},
  { path: 'processor-notifications', component: ProcessorNotificationsComponent, canActivate: [AuthGuard], data: { expectedRole: 'Payroll-Processor' }},
  { path: 'audit-trail', component: AuditTrailComponent, canActivate: [AuthGuard], data: { expectedRole: 'Payroll-Processor' }}

];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(myRoutes, withComponentInputBinding()) // ✅ Recommended for standalone components
  ]
};
