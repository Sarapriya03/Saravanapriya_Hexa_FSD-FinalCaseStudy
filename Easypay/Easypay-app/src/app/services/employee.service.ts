import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../models/employee.model";
import { LeaveRequest } from "../models/leave-request.model";
import { Notification } from "../models/notification.model";
import { Timesheet } from "../models/timesheet.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private empBaseURL = 'http://localhost:5043/api/v8.0/Employee';
  private leaveURL = 'http://localhost:5043/api/v7.0/LeaveRequest';
  private timesheetURL = 'http://localhost:5043/api/v2.0/Timesheet';
  private notificationURL = 'http://localhost:5043/api/v6.0/Notification';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // ✅ Employee CRUD
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.empBaseURL}/GetAll`, { headers: this.getAuthHeaders() });
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.empBaseURL}/GetById/${id}`, { headers: this.getAuthHeaders() });
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.empBaseURL}/Add`, employee, { headers: this.getAuthHeaders() });
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.empBaseURL}/Update`, employee, { headers: this.getAuthHeaders() });
  }

  deleteEmployee(employee: Employee): Observable<any> {
    return this.http.request('delete', `${this.empBaseURL}/Delete`, { body: employee, headers: this.getAuthHeaders() });
  }

  // ✅ Leave Requests
  submitLeaveRequest(request: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`${this.leaveURL}/Submit`, request, { headers: this.getAuthHeaders() });
  }

  getLeaveRequestsByEmployee(id: number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.leaveURL}/employee/${id}/GetById`, { headers: this.getAuthHeaders() });
  }

  // ✅ Notifications
  getNotifications(empId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.notificationURL}/GetAll`, { headers: this.getAuthHeaders() });
  }

  // ✅ Timesheets
  submitTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    return this.http.post<Timesheet>(`${this.timesheetURL}/Add`, timesheet, { headers: this.getAuthHeaders() });
  }

  getTimesheetsByEmployee(id: number): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(`${this.timesheetURL}/employee/${id}/GetById`, { headers: this.getAuthHeaders() });
  }
}
