BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250618155703_AddPayrollConfigAndTimesheetAndNotification', N'7.0.10');
GO

COMMIT;
GO

