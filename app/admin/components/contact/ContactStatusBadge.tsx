import React from 'react';
import { ContactStatus } from '../../lib/api';

interface ContactStatusBadgeProps {
  status: ContactStatus;
}

const STATUS_STYLES: Record<ContactStatus, { label: string; className: string }> = {
  NEW: {
    label: 'New',
    className: 'border-amber-200 bg-amber-50 text-amber-900',
  },
  READ: {
    label: 'Read',
    className: 'border-blue-200 bg-blue-50 text-blue-900',
  },
  ARCHIVED: {
    label: 'Archived',
    className: 'border-stone-200 bg-stone-100 text-stone-700',
  },
};

export function ContactStatusBadge({ status }: ContactStatusBadgeProps) {
  const config = STATUS_STYLES[status] || STATUS_STYLES.NEW;

  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
