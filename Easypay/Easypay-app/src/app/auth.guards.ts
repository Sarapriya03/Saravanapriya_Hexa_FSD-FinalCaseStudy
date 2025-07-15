import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('employeeId'); // must match login set
    if (!isLoggedIn) {
      console.warn('Access denied. Redirecting to login.');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
