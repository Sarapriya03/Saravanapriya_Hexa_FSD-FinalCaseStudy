import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../models/leave-request.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private baseURL = 'http://localhost:5043/api/v7.0/LeaveRequest';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // 🔹 Submit a new leave request
  submitLeaveRequest(req: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(
      `${this.baseURL}/Submit`,
      req,
      { headers: this.getAuthHeaders() }
    );
  }

  // 🔹 Approve or reject a leave request
  approveOrRejectLeave(req: LeaveRequest): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(
      `${this.baseURL}/Approve`,
      req,
      { headers: this.getAuthHeaders() }
    );
  }

  // 🔹 Get leave requests by employee ID
  getLeaveRequestsByEmployee(id: number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(
      `${this.baseURL}/employee/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // 🔹 Get all leave requests
  getAllLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(
      `${this.baseURL}/GetAll`,
      { headers: this.getAuthHeaders() }
    );
  }
}
