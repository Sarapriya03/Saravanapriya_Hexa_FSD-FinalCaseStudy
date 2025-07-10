import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Payroll } from "../models/payroll.model";
import { AuditLog } from "../models/audit-log.model";
import { Notification } from "../models/notification.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PayrollService {
  private baseURL = 'http://localhost:5043/api/v1.0';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Public route
  getPayrolls(): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(`${this.baseURL}/Payroll/GetAll`);
  }

  // Protected route
  processPayroll(payload: Payroll): Observable<Payroll> {
    const headers = this.getAuthHeaders();
    return this.http.post<Payroll>(`${this.baseURL}/Payroll/generate`, payload, { headers });
  }

  // Protected route
  verifyPayroll(id: number): Observable<Payroll> {
    const headers = this.getAuthHeaders();
    return this.http.get<Payroll>(`${this.baseURL}/Payroll/Verify/${id}`, { headers });
  }

  // Public route
  getAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.baseURL}/AuditLog/GetAll`);
  }

  // Public route
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseURL}/Notification/GetAll`);
  }
}
