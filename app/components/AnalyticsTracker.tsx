"use client";

import { useEffect, useRef } from "react";
import {
  trackPageView,
  trackEvent,
  type AllowedSection,
  ALLOWED_SECTIONS,
} from "../lib/analytics";

export default function AnalyticsTracker() {
  const viewedSectionsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    trackPageView();

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id as AllowedSection;
            if (
              ALLOWED_SECTIONS.includes(sectionId) &&
              !viewedSectionsRef.current.has(sectionId)
            ) {
              viewedSectionsRef.current.add(sectionId);
              trackEvent("section_view", { section: sectionId });
              observer.unobserve(entry.target);
            }
          }
        }
      },
      {
        threshold: 0.2,
      }
    );

    for (const sectionId of ALLOWED_SECTIONS) {
      const el = document.getElementById(sectionId);
      if (el && !viewedSectionsRef.current.has(sectionId)) {
        observer.observe(el);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
