"use client";

export const ALLOWED_EVENT_TYPES = [
  "page_view",
  "section_view",
  "project_view",
  "resume_click",
  "github_click",
  "linkedin_click",
  "live_demo_click",
  "contact_submission",
  "feedback_submission",
] as const;

export type AllowedEventType = (typeof ALLOWED_EVENT_TYPES)[number];

export const ALLOWED_SECTIONS = [
  "about",
  "work",
  "experience",
  "contact",
] as const;

export type AllowedSection = (typeof ALLOWED_SECTIONS)[number];

export interface ProjectMetadata {
  projectId: string;
  projectTitle: string;
}

export interface TrackEventOptions {
  section?: AllowedSection;
  metadata?: ProjectMetadata;
}

const SESSION_STORAGE_KEY = "analytics_session_id";
let inMemorySessionId: string | null = null;
let sessionInitPromise: Promise<string | null> | null = null;
let pageViewFired = false;

function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return "";
  }
  return "http://localhost:5000";
}

function getStoredSessionId(): string | null {
  if (inMemorySessionId) return inMemorySessionId;
  if (typeof window === "undefined") return null;
  try {
    const stored = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      inMemorySessionId = stored;
      return stored;
    }
  } catch {
    // sessionStorage unavailable
  }
  return null;
}

function storeSessionId(id: string): void {
  inMemorySessionId = id;
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, id);
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

async function getOrCreateSession(): Promise<string | null> {
  const existing = getStoredSessionId();
  if (existing) {
    return existing;
  }

  if (sessionInitPromise) {
    return sessionInitPromise;
  }

  sessionInitPromise = (async () => {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/api/analytics/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return null;
      }

      const data = (await res.json()) as { sessionId?: string };
      if (data && typeof data.sessionId === "string") {
        storeSessionId(data.sessionId);
        return data.sessionId;
      }
      return null;
    } catch {
      return null;
    } finally {
      sessionInitPromise = null;
    }
  })();

  return sessionInitPromise;
}

export function trackEvent(
  eventType: AllowedEventType,
  options?: TrackEventOptions
): void {
  // Fire and forget - never blocks the caller
  (async () => {
    try {
      const sessionId = await getOrCreateSession();
      if (!sessionId) return;

      const payload: {
        sessionId: string;
        eventType: AllowedEventType;
        section?: AllowedSection;
        metadata?: Record<string, string>;
      } = {
        sessionId,
        eventType,
      };

      if (eventType === "section_view" && options?.section) {
        payload.section = options.section;
      }

      if (
        (eventType === "project_view" ||
          eventType === "live_demo_click" ||
          eventType === "github_click") &&
        options?.metadata
      ) {
        payload.metadata = {
          projectId: options.metadata.projectId,
          projectTitle: options.metadata.projectTitle,
        };
      }

      const baseUrl = getApiBaseUrl();
      await fetch(`${baseUrl}/api/analytics/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch {
      // Best-effort: silent fail
    }
  })();
}

export function trackPageView(): void {
  if (pageViewFired) return;
  pageViewFired = true;
  trackEvent("page_view");
}
