'use client';

import React from 'react';
import { OverviewRange } from '../../lib/api';

interface RangeOption {
  label: string;
  value: OverviewRange;
}

const RANGE_OPTIONS: RangeOption[] = [
  { label: '7 days', value: '7d' },
  { label: '30 days', value: '30d' },
  { label: 'All time', value: 'all' },
];

interface RangeSelectorProps {
  selected: OverviewRange;
  onChange: (range: OverviewRange) => void;
  disabled?: boolean;
}

export function RangeSelector({ selected, onChange, disabled = false }: RangeSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Select overview time range"
      className="inline-flex rounded border border-stone-200 bg-white p-0.5"
    >
      {RANGE_OPTIONS.map((option) => {
        const isSelected = selected === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            disabled={disabled}
            aria-pressed={isSelected}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 disabled:opacity-50 ${
              isSelected
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
