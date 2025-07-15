import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuditLog } from '../models/audit-log.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  private baseURL = 'http://localhost:5043/api/v10.0/AuditLog';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // 🔹 Add a new audit log
  addLog(log: AuditLog): Observable<AuditLog> {
    return this.http.post<AuditLog>(
      `${this.baseURL}/Add`,
      log,
      { headers: this.getAuthHeaders() }
    );
  }

  // 🔹 Get all audit logs
  getAllLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(
      `${this.baseURL}/GetAll`,
      { headers: this.getAuthHeaders() }
    );
  }
}
