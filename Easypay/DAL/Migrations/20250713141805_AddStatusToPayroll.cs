using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusToPayroll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeaveRequest_Employee_EmployeeId",
                table: "LeaveRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_Notification_Employee_EmployeeId",
                table: "Notification");

            migrationBuilder.DropForeignKey(
                name: "FK_Payroll_Employee_EmployeeId",
                table: "Payroll");

            migrationBuilder.DropForeignKey(
                name: "FK_PayrollConfig_Employee_EmployeeId",
                table: "PayrollConfig");

            migrationBuilder.DropForeignKey(
                name: "FK_Timesheet_Employee_EmployeeId",
                table: "Timesheet");

            migrationBuilder.DropIndex(
                name: "IX_Timesheet_EmployeeId",
                table: "Timesheet");

            migrationBuilder.DropIndex(
                name: "IX_PayrollConfig_EmployeeId",
                table: "PayrollConfig");

            migrationBuilder.DropIndex(
                name: "IX_Payroll_EmployeeId",
                table: "Payroll");

            migrationBuilder.DropIndex(
                name: "IX_Notification_EmployeeId",
                table: "Notification");

            migrationBuilder.DropIndex(
                name: "IX_LeaveRequest_EmployeeId",
                table: "LeaveRequest");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Payroll",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Payroll");

            migrationBuilder.CreateIndex(
                name: "IX_Timesheet_EmployeeId",
                table: "Timesheet",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollConfig_EmployeeId",
                table: "PayrollConfig",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Payroll_EmployeeId",
                table: "Payroll",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_EmployeeId",
                table: "Notification",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveRequest_EmployeeId",
                table: "LeaveRequest",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveRequest_Employee_EmployeeId",
                table: "LeaveRequest",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_Employee_EmployeeId",
                table: "Notification",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Payroll_Employee_EmployeeId",
                table: "Payroll",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PayrollConfig_Employee_EmployeeId",
                table: "PayrollConfig",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Timesheet_Employee_EmployeeId",
                table: "Timesheet",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
