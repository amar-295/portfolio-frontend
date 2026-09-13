'use client';

import React from 'react';
import { AnalyticsOutboundClicks } from '../../lib/api';

interface OutboundClicksProps {
  clicks: AnalyticsOutboundClicks;
}

interface DestinationItem {
  destination: string;
  count: number;
}

export function OutboundClicks({ clicks }: OutboundClicksProps) {
  const items: DestinationItem[] = [
    { destination: 'GitHub', count: clicks.github },
    { destination: 'Live Demo', count: clicks.liveDemo },
    { destination: 'Resume', count: clicks.resume },
    { destination: 'LinkedIn', count: clicks.linkedin },
  ].sort((a, b) => b.count - a.count);

  const totalClicks = items.reduce((sum, item) => sum + item.count, 0);

  if (totalClicks === 0) {
    return (
      <div className="rounded border border-stone-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-stone-900">Outbound clicks</h2>
        <p className="mt-2 text-xs text-stone-500">No outbound clicks yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-stone-900">Outbound clicks</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-stone-200 text-stone-500">
              <th scope="col" className="pb-2 font-medium">Destination</th>
              <th scope="col" className="pb-2 text-right font-medium">Clicks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {items.map(({ destination, count }) => (
              <tr key={destination} className="hover:bg-stone-50/50">
                <td className="py-2 text-stone-700 font-medium">{destination}</td>
                <td className="py-2 text-right font-mono font-medium text-stone-900">
                  {count.toLocaleString('en-US')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
