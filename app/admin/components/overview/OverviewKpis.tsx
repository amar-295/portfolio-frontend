'use client';

import React from 'react';
import { OverviewKpis as KpisType } from '../../lib/api';

interface OverviewKpisProps {
  kpis: KpisType;
  isLoading?: boolean;
}

interface KpiItem {
  label: string;
  value: number;
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function OverviewKpis({ kpis, isLoading = false }: OverviewKpisProps) {
  const items: KpiItem[] = [
    { label: 'Unread feedback', value: kpis.unreadFeedback },
    { label: 'Unread contact', value: kpis.unreadContacts },
    { label: 'Sessions', value: kpis.totalSessions },
    { label: 'Events', value: kpis.totalEvents },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded border border-stone-200 bg-white p-4"
        >
          <p className="text-xs font-medium text-stone-500">{item.label}</p>
          <div className="mt-2 flex items-baseline">
            {isLoading ? (
              <div className="h-7 w-14 animate-pulse rounded bg-stone-200" />
            ) : (
              <p className="text-2xl font-semibold tracking-tight text-stone-900">
                {formatNumber(item.value)}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
