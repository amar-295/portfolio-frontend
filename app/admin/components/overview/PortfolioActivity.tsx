'use client';

import React from 'react';
import { OverviewHighIntentClicks } from '../../lib/api';

interface PortfolioActivityProps {
  clicks: OverviewHighIntentClicks;
  isLoading?: boolean;
}

interface ActivityClickItem {
  label: string;
  count: number;
}

export function PortfolioActivity({ clicks, isLoading = false }: PortfolioActivityProps) {
  const items: ActivityClickItem[] = [
    { label: 'Resume', count: clicks.resume },
    { label: 'GitHub', count: clicks.github },
    { label: 'LinkedIn', count: clicks.linkedin },
    { label: 'Live demos', count: clicks.liveDemo },
  ];

  return (
    <div className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
        Portfolio links
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded border border-stone-100 bg-stone-50 p-3"
          >
            <p className="text-xs text-stone-500">{item.label}</p>
            <div className="mt-1 flex items-baseline">
              {isLoading ? (
                <div className="h-5 w-8 animate-pulse rounded bg-stone-200" />
              ) : (
                <p className="font-mono text-lg font-semibold text-stone-900">
                  {item.count}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
