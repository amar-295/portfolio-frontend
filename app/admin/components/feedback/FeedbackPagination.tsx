'use client';

import React from 'react';

interface FeedbackPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  disabled?: boolean;
}

export function FeedbackPagination({
  page,
  totalPages,
  totalItems,
  onPageChange,
  disabled = false,
}: FeedbackPaginationProps) {
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages || totalPages === 0;

  return (
    <nav
      aria-label="Feedback pagination"
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-stone-200 pt-4"
    >
      <p className="text-xs text-stone-500 font-mono">
        Page {page} of {totalPages || 1} ({totalItems} total {totalItems === 1 ? 'item' : 'items'})
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={disabled || isFirstPage}
          className="rounded border border-stone-300 bg-white px-3 py-1 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={disabled || isLastPage}
          className="rounded border border-stone-300 bg-white px-3 py-1 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
