import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  public userRole$ = this.roleSubject.asObservable();

  setRole(role: string): void {
    localStorage.setItem('userRole', role);
    this.roleSubject.next(role);
  }

  clearRole(): void {
    localStorage.removeItem('userRole');
    this.roleSubject.next(null);
  }
}
