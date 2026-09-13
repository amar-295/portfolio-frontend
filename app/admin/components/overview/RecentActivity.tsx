'use client';

import React from 'react';
import { OverviewRecentActivityItem } from '../../lib/api';

interface RecentActivityProps {
  activity: OverviewRecentActivityItem[];
  isLoading?: boolean;
}

function formatActivityTimestamp(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return isoString;
    }

    const now = Date.now();
    const diffMs = now - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60 && diffSec >= 0) {
      return 'Just now';
    }
    if (diffMin < 60 && diffMin >= 0) {
      return `${diffMin}m ago`;
    }
    if (diffHours < 24 && diffHours >= 0) {
      return `${diffHours}h ago`;
    }
    if (diffDays < 7 && diffDays >= 0) {
      return `${diffDays}d ago`;
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  } catch {
    return isoString;
  }
}

export function RecentActivity({ activity, isLoading = false }: RecentActivityProps) {
  return (
    <div className="rounded border border-stone-200 bg-white p-4">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Recent activity
        </h2>
        <span className="font-mono text-xs text-stone-400">
          {activity.length > 0 ? `${activity.length} events` : ''}
        </span>
      </div>

      <div className="mt-2">
        {isLoading ? (
          <div className="space-y-3 py-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-1.5">
                <div className="h-4 w-48 animate-pulse rounded bg-stone-200" />
                <div className="h-3 w-16 animate-pulse rounded bg-stone-100" />
              </div>
            ))}
          </div>
        ) : activity.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-500">
            No recent activity.
          </div>
        ) : (
          <ul className="divide-y divide-stone-100">
            {activity.map((item, idx) => (
              <li
                key={`${item.timestamp}-${idx}`}
                className="flex items-center justify-between py-2.5 text-xs"
              >
                <span className="font-medium text-stone-800">{item.title}</span>
                <time
                  dateTime={item.timestamp}
                  className="shrink-0 font-mono text-[11px] text-stone-400"
                >
                  {formatActivityTimestamp(item.timestamp)}
                </time>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
