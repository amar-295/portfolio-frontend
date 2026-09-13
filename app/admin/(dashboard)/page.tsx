'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  getAdminOverview,
  OverviewData,
  OverviewRange,
  ApiError,
} from '../lib/api';
import { useAdminAuth } from '../context/AdminAuthContext';
import { RangeSelector } from '../components/overview/RangeSelector';
import { OverviewKpis } from '../components/overview/OverviewKpis';
import { StatusBreakdown } from '../components/overview/StatusBreakdown';
import { PortfolioActivity } from '../components/overview/PortfolioActivity';
import { RecentActivity } from '../components/overview/RecentActivity';

export default function AdminOverviewPage() {
  const { refreshAuth } = useAdminAuth();
  const [range, setRange] = useState<OverviewRange>('30d');
  const [data, setData] = useState<OverviewData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const activeRequestId = useRef<number>(0);

  useEffect(() => {
    let isMounted = true;
    const requestId = ++activeRequestId.current;

    getAdminOverview(range)
      .then((result) => {
        if (isMounted && requestId === activeRequestId.current) {
          setData(result);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted && requestId === activeRequestId.current) {
          if (err instanceof ApiError && err.status === 401) {
            refreshAuth();
            return;
          }
          setError('Unable to load overview data.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [range, refreshAuth]);

  const handleRangeChange = (newRange: OverviewRange) => {
    if (newRange !== range) {
      setIsLoading(true);
      setError(null);
      setRange(newRange);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    const requestId = ++activeRequestId.current;

    getAdminOverview(range)
      .then((result) => {
        if (requestId === activeRequestId.current) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (requestId === activeRequestId.current) {
          if (err instanceof ApiError && err.status === 401) {
            refreshAuth();
            return;
          }
          setError('Unable to load overview data.');
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-stone-900">
            Overview
          </h1>
          <p className="mt-1 text-xs text-stone-500">
            Portfolio performance, visitor interactions, and inbox status.
          </p>
        </div>

        <div>
          <RangeSelector
            selected={range}
            onChange={handleRangeChange}
            disabled={isLoading && !data}
          />
        </div>
      </div>

      {error ? (
        <div
          role="alert"
          className="rounded border border-red-200 bg-red-50 p-4 text-center"
        >
          <p className="text-xs font-medium text-red-800">{error}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-3 inline-flex items-center rounded border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
          >
            Try again
          </button>
        </div>
      ) : !data && isLoading ? (
        <div
          role="status"
          aria-label="Loading overview data"
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded border border-stone-200 bg-white p-4"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="h-40 animate-pulse rounded border border-stone-200 bg-white" />
            <div className="h-40 animate-pulse rounded border border-stone-200 bg-white" />
          </div>
          <div className="h-28 animate-pulse rounded border border-stone-200 bg-white" />
          <div className="h-48 animate-pulse rounded border border-stone-200 bg-white" />
        </div>
      ) : data ? (
        <div className="space-y-6">
          <OverviewKpis kpis={data.kpis} isLoading={isLoading} />
          <StatusBreakdown
            feedback={data.feedbackBreakdown}
            contact={data.contactBreakdown}
            isLoading={isLoading}
          />
          <PortfolioActivity clicks={data.highIntentClicks} isLoading={isLoading} />
          <RecentActivity activity={data.recentActivity} isLoading={isLoading} />
        </div>
      ) : null}
    </div>
  );
}
