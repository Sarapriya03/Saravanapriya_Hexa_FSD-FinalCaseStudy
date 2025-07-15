import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Timesheet } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private baseURL = 'http://localhost:5043/api/v2.0/Timesheet';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Add or Update Timesheet (POST)
  addOrUpdateTimesheet(sheet: Timesheet): Observable<Timesheet> {
    const headers = this.getAuthHeaders();
    return this.http.post<Timesheet>(`${this.baseURL}/Add`, sheet, { headers });
  }

  // Get Timesheets by Employee ID (GET)
  getTimesheetsByEmployeeId(employeeId: number): Observable<Timesheet[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Timesheet[]>(`${this.baseURL}/employee/${employeeId}/GetById`, { headers });
  }
}
