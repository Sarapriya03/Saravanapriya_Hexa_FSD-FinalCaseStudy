import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  user = {
    email: '',
    password: '',
    role: 'Employee'
  };

  error: string = '';

  login() {
  if (!this.user.email || !this.user.password) {
    this.error = 'Email and password are required.';
    return;
  }

  // Simulate login
  console.log('User logged in:', this.user);

  localStorage.setItem('employeeId', '10'); // Simulated ID
  this.authService.setRole(this.user.role); // set the user role

  this.error = '';

  // Redirect based on role
  if (this.user.role === 'Manager') {
    this.router.navigate(['/manager-home']);
  } else if (this.user.role === 'Employee'){
    this.router.navigate(['/home']);
  } else {
    this.router.navigate(['/processor-home']);
  }
}

}
