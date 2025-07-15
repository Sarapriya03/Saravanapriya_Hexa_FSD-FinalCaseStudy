import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Payroll } from "../models/payroll.model";
import { AuditLog } from "../models/audit-log.model";
import { Notification } from "../models/notification.model";
import { PayrollConfig } from "../models/payrollconfig.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PayrollProcessorService {
  private payrollURL = 'http://localhost:5043/api/v4.0/Payroll';
  private auditURL = 'http://localhost:5043/api/v10.0/AuditLog';
  private notificationURL = 'http://localhost:5043/api/v6.0/Notification';
  private payrollconfigURL = 'http://localhost:5043/api/v5.0/PayrollConfig';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // 🔹 Dashboard – Get all payroll Configs(summary/status)
  getAll():Observable<PayrollConfig[]> {
    return this.http.get<PayrollConfig[]>(`${this.payrollconfigURL}/GetAll`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get all payrolls
  getAllPayrolls(): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(`${this.payrollURL}/GetAll`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Payroll Processing – Generate payroll
  generatePayroll(payroll: Payroll): Observable<Payroll> {
    return this.http.post<Payroll>(`${this.payrollURL}/generate`, payroll, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Verify Payroll
  verifyPayroll(id: number): Observable<Payroll> {
    return this.http.get<Payroll>(`${this.payrollURL}/Verify/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Get Payrolls by Employee ID (optional for detail)
  getPayrollsByEmployee(id: number): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(`${this.payrollURL}/employee/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Add Payroll Record (optional)
  addPayroll(payroll: Payroll): Observable<Payroll> {
    return this.http.post<Payroll>(`${this.payrollURL}/Add`, payroll, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Update Payroll Record (optional)
  updatePayroll(payroll: Payroll): Observable<Payroll> {
    return this.http.put<Payroll>(`${this.payrollURL}/Update`, payroll, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Delete Payroll Record (optional)
  deletePayroll(payroll: Payroll): Observable<any> {
    return this.http.request('delete', `${this.payrollURL}/Delete`, {
      body: payroll,
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Audit Trail
  getAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.auditURL}/GetAll`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Notifications
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.notificationURL}/GetAll`, {
      headers: this.getAuthHeaders()
    });
  }
}
