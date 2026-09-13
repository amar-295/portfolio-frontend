'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '../context/AdminAuthContext';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/admin' },
  { label: 'Feedback', href: '/admin/feedback' },
  { label: 'Contact', href: '/admin/contact' },
  { label: 'Analytics', href: '/admin/analytics' },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, logout } = useAdminAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);
    const result = await logout();
    if (result.success) {
      router.replace('/admin/login');
    } else {
      setLogoutError(result.error || 'Logout failed. Please try again.');
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-100 text-stone-900">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-tight text-stone-950">
              Portfolio Admin
            </span>
            <span className="rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 font-mono text-[11px] text-stone-600">
              v1
            </span>
          </div>

          <div className="flex items-center gap-3">
            {admin?.email && (
              <span
                className="hidden rounded border border-stone-200 bg-stone-50 px-2 py-1 font-mono text-xs text-stone-700 sm:inline-block"
                title="Authenticated Admin"
              >
                {admin.email}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded border border-stone-300 bg-white px-2.5 py-1 text-xs font-medium text-stone-800 transition-colors hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 disabled:opacity-50"
            >
              {isLoggingOut ? 'Logging out...' : 'Log out'}
            </button>
          </div>
        </div>

        {logoutError && (
          <div
            role="alert"
            className="border-t border-red-200 bg-red-50 px-4 py-2 text-center text-xs text-red-800"
          >
            {logoutError}
          </div>
        )}

        <div className="border-t border-stone-200 bg-stone-50/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
            <nav
              aria-label="Admin Navigation"
              className="flex items-center gap-1 overflow-x-auto py-1.5"
            >
              {navItems.map((item) => {
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`shrink-0 rounded border px-3 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 ${
                      isActive
                        ? 'border-stone-400 bg-stone-200 font-semibold text-stone-950 shadow-none'
                        : 'border-transparent font-normal text-stone-600 hover:border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main id="admin-main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 md:px-8">
        {children}
      </main>
    </div>
  );
}
