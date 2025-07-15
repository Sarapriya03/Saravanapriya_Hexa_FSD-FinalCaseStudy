import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  employee: Employee = {} as Employee;
  originalEmployee: Employee = {} as Employee;
  empId: number = 10; // ✅ Hardcoded employee ID
  isEditing = false;
  showProfile = false;
  errorMessage = '';

  constructor(private svc: EmployeeService) {}

  ngOnInit(): void {
    console.log('Using hardcoded empId:', this.empId);
    this.fetchEmployee();
  }

  fetchEmployee(): void {
    console.log('Calling getEmployeeById with id:', this.empId);

    this.svc.getEmployeeById(this.empId).subscribe({
      next: (data) => {
        console.log('Employee fetched:', data);
        this.employee = data;
        this.originalEmployee = { ...data };
        this.showProfile = true;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Failed to load employee:', err);
        this.errorMessage = 'Failed to fetch employee details.';
        this.showProfile = false;
      }
    });
  }

  save(): void {
    console.log('Saving employee changes:', this.employee);
    this.svc.updateEmployee(this.employee).subscribe({
      next: () => {
        alert('Details updated successfully');
        this.originalEmployee = { ...this.employee };
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update employee details');
      }
    });
  }

  cancelEdit(): void {
    this.employee = { ...this.originalEmployee };
    this.isEditing = false;
  }

  enableEdit(): void {
    this.isEditing = true;
  }
}
