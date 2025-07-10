export interface LeaveRequest {
    leaveRequestId:number,
    employeeId:number,
    startDate:Date,
    endDate:Date,
    status:string
}