export interface Payroll {
    payrollId:number,
    employeeId:number,
    salary:number,
    bonus:number,
    deductions:number,
    netSalary:number,
    payrollDate:Date,
    status:string
}