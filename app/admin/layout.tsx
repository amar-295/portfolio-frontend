import type { Metadata } from 'next';
import { AdminAuthProvider } from './context/AdminAuthContext';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-stone-100 text-stone-900 antialiased font-sans">
        {children}
      </div>
    </AdminAuthProvider>
  );
}
