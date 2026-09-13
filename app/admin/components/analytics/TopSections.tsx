'use client';

import React from 'react';
import { AnalyticsTopSection } from '../../lib/api';

const SECTION_LABELS: Record<string, string> = {
  about: 'About',
  work: 'Work',
  experience: 'Experience',
  contact: 'Contact',
};

function formatSectionName(section: string): string {
  if (SECTION_LABELS[section.toLowerCase()]) {
    return SECTION_LABELS[section.toLowerCase()];
  }
  return section.charAt(0).toUpperCase() + section.slice(1);
}

interface TopSectionsProps {
  sections: AnalyticsTopSection[];
}

export function TopSections({ sections }: TopSectionsProps) {
  const hasActivity = sections.some((s) => s.count > 0);

  if (!hasActivity || sections.length === 0) {
    return (
      <div className="rounded border border-stone-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-stone-900">Top sections</h2>
        <p className="mt-2 text-xs text-stone-500">No section activity yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-stone-900">Top sections</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-stone-200 text-stone-500">
              <th scope="col" className="w-8 pb-2 font-medium">#</th>
              <th scope="col" className="pb-2 font-medium">Section</th>
              <th scope="col" className="pb-2 text-right font-medium">Views</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {sections.map(({ section, count }, index) => (
              <tr key={section} className="hover:bg-stone-50/50">
                <td className="py-2 text-stone-400 font-mono">{index + 1}</td>
                <td className="py-2 text-stone-700 font-medium">{formatSectionName(section)}</td>
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
