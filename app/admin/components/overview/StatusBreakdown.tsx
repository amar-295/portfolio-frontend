'use client';

import React from 'react';
import { OverviewFeedbackBreakdown, OverviewContactBreakdown } from '../../lib/api';

interface StatusBreakdownProps {
  feedback: OverviewFeedbackBreakdown;
  contact: OverviewContactBreakdown;
  isLoading?: boolean;
}

interface BreakdownRowProps {
  label: string;
  count: number;
  isTotal?: boolean;
  isLoading?: boolean;
}

function BreakdownRow({ label, count, isTotal = false, isLoading = false }: BreakdownRowProps) {
  return (
    <div
      className={`flex items-center justify-between py-2 text-xs ${
        isTotal
          ? 'border-t border-stone-200 pt-2.5 font-semibold text-stone-900'
          : 'text-stone-600'
      }`}
    >
      <span>{label}</span>
      {isLoading ? (
        <div className="h-4 w-6 animate-pulse rounded bg-stone-200" />
      ) : (
        <span className={isTotal ? 'text-stone-900 font-semibold' : 'font-mono text-stone-800'}>
          {count}
        </span>
      )}
    </div>
  );
}

export function StatusBreakdown({ feedback, contact, isLoading = false }: StatusBreakdownProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded border border-stone-200 bg-white p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Feedback status
        </h2>
        <div className="mt-3 divide-y divide-stone-100">
          <BreakdownRow label="New" count={feedback.new} isLoading={isLoading} />
          <BreakdownRow label="Read" count={feedback.read} isLoading={isLoading} />
          <BreakdownRow label="Archived" count={feedback.archived} isLoading={isLoading} />
          <BreakdownRow label="Total" count={feedback.total} isTotal isLoading={isLoading} />
        </div>
      </div>

      <div className="rounded border border-stone-200 bg-white p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Contact status
        </h2>
        <div className="mt-3 divide-y divide-stone-100">
          <BreakdownRow label="New" count={contact.new} isLoading={isLoading} />
          <BreakdownRow label="Read" count={contact.read} isLoading={isLoading} />
          <BreakdownRow label="Archived" count={contact.archived} isLoading={isLoading} />
          <BreakdownRow label="Total" count={contact.total} isTotal isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
