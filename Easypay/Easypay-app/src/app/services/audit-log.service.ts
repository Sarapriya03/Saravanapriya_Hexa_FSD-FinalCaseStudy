import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuditLog } from '../models/audit-log.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuditLogService {
  private baseURL = 'http://localhost:5043/api/v1.0/AuditLog';

  constructor(private http: HttpClient) {}

  getAllLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.baseURL}/GetAll`);
  }
}
