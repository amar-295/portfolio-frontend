'use client';

import React from 'react';
import { AnalyticsTopProject } from '../../lib/api';

interface TopProjectsProps {
  projects: AnalyticsTopProject[];
}

export function TopProjects({ projects }: TopProjectsProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded border border-stone-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-stone-900">Top projects</h2>
        <p className="mt-2 text-xs text-stone-500">No project views yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-stone-900">Top projects</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-stone-200 text-stone-500">
              <th scope="col" className="pb-2 font-medium">Project</th>
              <th scope="col" className="pb-2 text-right font-medium">Views</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {projects.map(({ projectId, projectTitle, count }) => (
              <tr key={projectId} className="hover:bg-stone-50/50">
                <td className="py-2 text-stone-700 font-medium break-words">
                  {projectTitle || projectId}
                </td>
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
