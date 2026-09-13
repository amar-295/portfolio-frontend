'use client';

import React from 'react';
import { FeedbackStatus } from '../../lib/api';

interface FeedbackStatusControlProps {
  currentStatus: FeedbackStatus;
  onStatusChange: (newStatus: FeedbackStatus) => void;
  isPending?: boolean;
}

const STATUS_OPTIONS: { value: FeedbackStatus; label: string }[] = [
  { value: 'NEW', label: 'New' },
  { value: 'READ', label: 'Read' },
  { value: 'ARCHIVED', label: 'Archived' },
];

export function FeedbackStatusControl({
  currentStatus,
  onStatusChange,
  isPending = false,
}: FeedbackStatusControlProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as FeedbackStatus;
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
        aria-label="Change feedback status"
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
