'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  getAdminAnalytics,
  AdminAnalyticsData,
  AnalyticsRange,
  ApiError,
} from '../../lib/api';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AnalyticsRangeSelector } from '../../components/analytics/AnalyticsRangeSelector';
import { EventCounts } from '../../components/analytics/EventCounts';
import { TopSections } from '../../components/analytics/TopSections';
import { TopProjects } from '../../components/analytics/TopProjects';
import { OutboundClicks } from '../../components/analytics/OutboundClicks';

export default function AdminAnalyticsPage() {
  const { refreshAuth } = useAdminAuth();
  const [range, setRange] = useState<AnalyticsRange>('30d');
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const activeRequestId = useRef<number>(0);

  useEffect(() => {
    let isMounted = true;
    const requestId = ++activeRequestId.current;

    getAdminAnalytics(range)
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
          setError('Unable to load analytics data.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [range, refreshAuth]);

  const handleRangeChange = (newRange: AnalyticsRange) => {
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

    getAdminAnalytics(range)
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
          setError('Unable to load analytics data.');
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-stone-900">
            Analytics
          </h1>
          <p className="mt-1 text-xs text-stone-500">
            Traffic metrics, event activity, and interaction telemetry.
          </p>
        </div>

        <div>
          <AnalyticsRangeSelector
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
      ) : isLoading && !data ? (
        <div className="space-y-6">
          <div className="rounded border border-stone-200 bg-white p-4 animate-pulse">
            <div className="h-4 w-28 rounded bg-stone-200" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-stone-100" />
              <div className="h-4 w-full rounded bg-stone-100" />
              <div className="h-4 w-full rounded bg-stone-100" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded border border-stone-200 bg-white p-4 animate-pulse">
              <div className="h-4 w-24 rounded bg-stone-200" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full rounded bg-stone-100" />
                <div className="h-4 w-full rounded bg-stone-100" />
              </div>
            </div>

            <div className="rounded border border-stone-200 bg-white p-4 animate-pulse">
              <div className="h-4 w-24 rounded bg-stone-200" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full rounded bg-stone-100" />
                <div className="h-4 w-full rounded bg-stone-100" />
              </div>
            </div>
          </div>

          <div className="rounded border border-stone-200 bg-white p-4 animate-pulse">
            <div className="h-4 w-28 rounded bg-stone-200" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-stone-100" />
              <div className="h-4 w-full rounded bg-stone-100" />
            </div>
          </div>
        </div>
      ) : data ? (
        <div className={`space-y-6 ${isLoading ? 'opacity-60 transition-opacity' : ''}`}>
          <EventCounts events={data.eventsByType} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TopSections sections={data.topSections} />
            <TopProjects projects={data.topProjects} />
          </div>

          <OutboundClicks clicks={data.outboundClicks} />
        </div>
      ) : null}
    </div>
  );
}
