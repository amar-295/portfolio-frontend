'use client';

import React, { useState } from 'react';
import { AdminContactItem, ContactStatus } from '../../lib/api';
import { ContactStatusBadge } from './ContactStatusBadge';
import { ContactStatusControl } from './ContactStatusControl';

interface ContactItemProps {
  item: AdminContactItem;
  onUpdateStatus: (id: string, newStatus: ContactStatus) => Promise<string | null>;
}

function formatSubmissionDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return isoString;
    }
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

export function ContactItem({ item, onUpdateStatus }: ContactItemProps) {
  const [isPending, setIsPending] = useState(false);
  const [itemError, setItemError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: ContactStatus) => {
    setIsPending(true);
    setItemError(null);

    const errorMessage = await onUpdateStatus(item.id, newStatus);
    if (errorMessage) {
      setItemError(errorMessage);
    }
    setIsPending(false);
  };

  return (
    <article className="rounded border border-stone-200 bg-white p-4 sm:p-5 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2.5">
          <ContactStatusBadge status={item.status} />
          <time dateTime={item.createdAt} className="font-mono text-xs text-stone-400">
            {formatSubmissionDate(item.createdAt)}
          </time>
        </div>

        <ContactStatusControl
          currentStatus={item.status}
          onStatusChange={handleStatusChange}
          isPending={isPending}
        />
      </div>

      {itemError && (
        <div
          role="alert"
          className="mt-3 rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700"
        >
          {itemError}
        </div>
      )}

      <div className="mt-4 space-y-3 text-xs leading-relaxed">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-semibold text-stone-900">{item.name}</span>
          <a
            href={`mailto:${item.email}`}
            className="font-mono text-stone-500 hover:text-stone-900 hover:underline break-all"
          >
            {item.email}
          </a>
        </div>

        <div>
          <h3 className="font-medium text-stone-500">Message</h3>
          <p className="mt-1 text-stone-900 whitespace-pre-wrap break-words">
            {item.message}
          </p>
        </div>
      </div>
    </article>
  );
}
