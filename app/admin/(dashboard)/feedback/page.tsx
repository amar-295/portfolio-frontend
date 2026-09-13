'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  getAdminFeedback,
  updateAdminFeedbackStatus,
  AdminFeedbackData,
  FeedbackStatus,
  ApiError,
} from '../../lib/api';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FeedbackItem } from '../../components/feedback/FeedbackItem';
import { FeedbackPagination } from '../../components/feedback/FeedbackPagination';

export default function AdminFeedbackPage() {
  const { refreshAuth } = useAdminAuth();
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<AdminFeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const activeRequestId = useRef<number>(0);

  useEffect(() => {
    let isMounted = true;
    const requestId = ++activeRequestId.current;

    getAdminFeedback(page)
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
          setError('Unable to load feedback.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [page, refreshAuth]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      setIsLoading(true);
      setError(null);
      setPage(newPage);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    const requestId = ++activeRequestId.current;

    getAdminFeedback(page)
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
          setError('Unable to load feedback.');
          setIsLoading(false);
        }
      });
  };

  const handleUpdateStatus = async (
    id: string,
    newStatus: FeedbackStatus
  ): Promise<string | null> => {
    try {
      const updated = await updateAdminFeedbackStatus(id, newStatus);
      setData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          items: prev.items.map((item) => (item.id === id ? updated : item)),
        };
      });
      return null;
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          await refreshAuth();
          return 'Authentication required. Please log in.';
        }
        if (err.status === 403) {
          return 'Action forbidden. Please check CSRF headers.';
        }
        if (err.status === 404) {
          return 'Feedback record not found or already deleted.';
        }
      }
      return 'Failed to update feedback status. Please try again.';
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-xl font-semibold tracking-tight text-stone-900">
          Feedback
        </h1>
        <p className="mt-1 text-xs text-stone-500">
          Visitor feedback submissions and moderation inbox.
        </p>
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
          aria-label="Loading feedback data"
          className="space-y-4"
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded border border-stone-200 bg-white p-4"
            />
          ))}
        </div>
      ) : data ? (
        data.items.length === 0 ? (
          <div className="rounded border border-stone-200 bg-white py-12 text-center text-xs text-stone-500">
            No feedback yet.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              {data.items.map((item) => (
                <FeedbackItem
                  key={item.id}
                  item={item}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </div>

            <FeedbackPagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
              totalItems={data.pagination.totalItems}
              onPageChange={handlePageChange}
              disabled={isLoading}
            />
          </div>
        )
      ) : null}
    </div>
  );
}
