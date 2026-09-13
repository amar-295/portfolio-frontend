import React from 'react';
import { AdminAuthGuard } from '../components/AdminAuthGuard';
import { AdminShell } from '../components/AdminShell';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <AdminShell>{children}</AdminShell>
    </AdminAuthGuard>
  );
}
