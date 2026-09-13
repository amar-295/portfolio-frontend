'use client';

import React from 'react';
import { AnalyticsEventTypeCount } from '../../lib/api';

const EVENT_TYPE_LABELS: Record<string, string> = {
  page_view: 'Page views',
  section_view: 'Section views',
  project_view: 'Project views',
  resume_click: 'Resume clicks',
  github_click: 'GitHub clicks',
  linkedin_click: 'LinkedIn clicks',
  live_demo_click: 'Live demo clicks',
  contact_submission: 'Contact submissions',
  feedback_submission: 'Feedback submissions',
};

function formatEventTypeLabel(eventType: string): string {
  if (EVENT_TYPE_LABELS[eventType]) {
    return EVENT_TYPE_LABELS[eventType];
  }
  return eventType
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

interface EventCountsProps {
  events: AnalyticsEventTypeCount[];
}

export function EventCounts({ events }: EventCountsProps) {
  if (events.length === 0) {
    return (
      <div className="rounded border border-stone-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-stone-900">Event activity</h2>
        <p className="mt-2 text-xs text-stone-500">No event activity yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-stone-900">Event activity</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-stone-200 text-stone-500">
              <th scope="col" className="pb-2 font-medium">Event type</th>
              <th scope="col" className="pb-2 text-right font-medium">Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {events.map(({ eventType, count }) => (
              <tr key={eventType} className="hover:bg-stone-50/50">
                <td className="py-2 text-stone-700">{formatEventTypeLabel(eventType)}</td>
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
