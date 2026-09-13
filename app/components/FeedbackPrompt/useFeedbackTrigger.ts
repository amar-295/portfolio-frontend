"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const SESSION_KEY = "feedback_prompt_shown";

function isSuppressed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function persistSuppressed(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, "true");
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

export function useFeedbackTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const isTriggeredRef = useRef(false);

  const dismiss = useCallback(() => {
    setIsOpen(false);
  }, []);

  const complete = useCallback(() => {
    persistSuppressed();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isSuppressed()) {
      return;
    }

    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let hasScrolled = false;
    let visibleSeconds = 0;
    let desktopTimerSatisfied = false;
    let mobileTimerSatisfied = false;
    let mobileScrollSatisfied = false;

    const fireTrigger = () => {
      if (isTriggeredRef.current || isSuppressed()) return;
      isTriggeredRef.current = true;
      persistSuppressed();
      setIsOpen(true);
      cleanup();
    };

    const handleDesktopMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && desktopTimerSatisfied && hasScrolled) {
        fireTrigger();
      }
    };

    let scrollRafId: number | null = null;
    const handleScroll = () => {
      if (scrollRafId !== null) return;

      scrollRafId = window.requestAnimationFrame(() => {
        scrollRafId = null;

        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > 30) {
          hasScrolled = true;
        }

        if (!isFinePointer) {
          const scrollHeight = document.documentElement.scrollHeight;
          const clientHeight = window.innerHeight || document.documentElement.clientHeight;
          const scrollableDistance = scrollHeight - clientHeight;

          if (scrollableDistance > 0) {
            const depth = (scrollY + clientHeight) / scrollHeight;
            if (depth >= 0.6) {
              mobileScrollSatisfied = true;
              if (mobileTimerSatisfied) {
                fireTrigger();
              }
            }
          }
        }
      });
    };

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        visibleSeconds += 1;

        if (isFinePointer) {
          if (visibleSeconds >= 15) {
            desktopTimerSatisfied = true;
          }
        } else {
          if (visibleSeconds >= 30) {
            mobileTimerSatisfied = true;
            if (mobileScrollSatisfied) {
              fireTrigger();
            }
          }
        }
      }
    }, 1000);

    if (isFinePointer) {
      document.addEventListener("mouseleave", handleDesktopMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    const cleanup = () => {
      window.clearInterval(intervalId);
      if (scrollRafId !== null) {
        window.cancelAnimationFrame(scrollRafId);
      }
      document.removeEventListener("mouseleave", handleDesktopMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };

    return cleanup;
  }, []);

  return {
    isOpen,
    dismiss,
    complete,
  };
}
