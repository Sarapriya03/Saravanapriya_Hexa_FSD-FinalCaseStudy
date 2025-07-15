import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Notification } from '../models/notification.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseURL = 'http://localhost:5043/api/v6.0/Notification';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // 🔹 Add new notification
  addNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(
      `${this.baseURL}/Add`,
      notification,
      { headers: this.getAuthHeaders() }
    );
  }

  // 🔹 Get notifications for a specific employee
  getByEmployeeId(empId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${this.baseURL}/employee/${empId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // 🔹 Get all notifications
  getAllNotifications(managerId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${this.baseURL}/GetAll`,
      { headers: this.getAuthHeaders() }
    );
  }
}
