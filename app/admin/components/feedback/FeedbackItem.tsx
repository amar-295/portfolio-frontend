'use client';

import React, { useState } from 'react';
import { AdminFeedbackItem, FeedbackStatus } from '../../lib/api';
import { FeedbackStatusBadge } from './FeedbackStatusBadge';
import { FeedbackStatusControl } from './FeedbackStatusControl';

interface FeedbackItemProps {
  item: AdminFeedbackItem;
  onUpdateStatus: (id: string, newStatus: FeedbackStatus) => Promise<string | null>;
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

export function FeedbackItem({ item, onUpdateStatus }: FeedbackItemProps) {
  const [isPending, setIsPending] = useState(false);
  const [itemError, setItemError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: FeedbackStatus) => {
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
          <FeedbackStatusBadge status={item.status} />
          <time dateTime={item.createdAt} className="font-mono text-xs text-stone-400">
            {formatSubmissionDate(item.createdAt)}
          </time>
        </div>

        <FeedbackStatusControl
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
        <div>
          <h3 className="font-medium text-stone-500">What brought you here?</h3>
          <p className="mt-1 text-stone-900 whitespace-pre-wrap break-words">
            {item.whatBroughtYouHere}
          </p>
        </div>

        {item.anythingYouSuggest && (
          <div>
            <h3 className="font-medium text-stone-500">Anything you suggest?</h3>
            <p className="mt-1 text-stone-800 whitespace-pre-wrap break-words">
              {item.anythingYouSuggest}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
