import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './payroll-processor/dashboard/dashboard.component';
import { ProcessPayrollComponent } from './payroll-processor/process-payroll/process-payroll.component';
import { VerifyPayrollComponent } from './payroll-processor/verify-payroll/verify-payroll.component';
import { AuditTrailComponent } from './payroll-processor/audit-trail/audit-trail.component';
import { NotificationsComponent } from './payroll-processor/notifications/notifications.component';
import { AuthGuard } from './auth.guards';
import { routes } from './app.routes';

const myRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  { path: 'process', component: ProcessPayrollComponent,canActivate:[AuthGuard] },
  { path: 'verify/:id', component: VerifyPayrollComponent,canActivate:[AuthGuard]},
  { path: 'audit-trail', component: AuditTrailComponent,canActivate:[AuthGuard] },
  { path: 'notifications', component: NotificationsComponent,canActivate:[AuthGuard] },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
