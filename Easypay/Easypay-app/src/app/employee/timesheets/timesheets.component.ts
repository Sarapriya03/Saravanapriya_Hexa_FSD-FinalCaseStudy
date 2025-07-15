import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Timesheet } from '../../models/timesheet.model';

@Component({
  selector: 'app-timesheets',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent {
  sheet: Timesheet = {} as Timesheet;
  empId: number = Number(localStorage.getItem('empId'));

  constructor(private svc: EmployeeService) {
    this.sheet.employeeId = this.empId;
    this.sheet.hoursWorked = 0;
  }

  submit() {
    this.svc.submitTimesheet(this.sheet).subscribe(() => {
      alert('Timesheet submitted');
      this.sheet = { employeeId: this.empId, hoursWorked: 0 } as Timesheet;
    });
  }
}
