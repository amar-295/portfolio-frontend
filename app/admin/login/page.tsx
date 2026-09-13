'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { admin, isLoading, login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && admin) {
      router.replace('/admin');
    }
  }, [isLoading, admin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const result = await login({ email, password });
    if (result.success) {
      router.replace('/admin');
    } else {
      setFormError(result.error || 'Invalid credentials');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="Checking authentication"
        className="flex min-h-screen items-center justify-center bg-stone-100 p-4"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-700" />
          <p className="text-sm font-medium text-stone-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (admin) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 p-4">
      <div className="w-full max-w-sm rounded border border-stone-200 bg-white p-6 sm:p-8">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-stone-900">
            Admin Sign In
          </h1>
          <p className="mt-1 text-xs text-stone-500">
            Authenticate to access the admin console.
          </p>
        </div>

        {formError && (
          <div
            role="alert"
            className="mt-4 rounded border border-red-200 bg-red-50 p-2.5 text-xs text-red-800"
          >
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-medium text-stone-700"
            >
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="mt-1 block w-full rounded border border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-800 disabled:bg-stone-50 disabled:text-stone-400"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-medium text-stone-700"
            >
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="mt-1 block w-full rounded border border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-800 disabled:bg-stone-50 disabled:text-stone-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded border border-stone-800 bg-stone-900 py-2 text-xs font-medium text-white transition-colors hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
