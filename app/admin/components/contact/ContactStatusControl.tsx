'use client';

import React from 'react';
import { ContactStatus } from '../../lib/api';

interface ContactStatusControlProps {
  currentStatus: ContactStatus;
  onStatusChange: (newStatus: ContactStatus) => void;
  isPending?: boolean;
}

const STATUS_OPTIONS: { value: ContactStatus; label: string }[] = [
  { value: 'NEW', label: 'New' },
  { value: 'READ', label: 'Read' },
  { value: 'ARCHIVED', label: 'Archived' },
];

export function ContactStatusControl({
  currentStatus,
  onStatusChange,
  isPending = false,
}: ContactStatusControlProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as ContactStatus;
    if (selected !== currentStatus) {
      onStatusChange(selected);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentStatus}
        onChange={handleChange}
        disabled={isPending}
        aria-label="Change contact submission status"
        className="rounded border border-stone-300 bg-white px-2 py-1 text-xs text-stone-800 transition-colors hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 disabled:cursor-not-allowed disabled:bg-stone-50 disabled:text-stone-400"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isPending && (
        <span
          role="status"
          aria-live="polite"
          className="text-xs text-stone-500 font-mono"
        >
          Updating...
        </span>
      )}
    </div>
  );
}
