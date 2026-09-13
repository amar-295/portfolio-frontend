"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useFeedbackTrigger } from "./useFeedbackTrigger";
import { trackEvent } from "../../lib/analytics";

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

export default function FeedbackPrompt() {
  const { isOpen, dismiss, complete } = useFeedbackTrigger();
  const shouldReduceMotion = useReducedMotion();

  const [whatBroughtYouHere, setWhatBroughtYouHere] = useState("");
  const [anythingYouSuggest, setAnythingYouSuggest] = useState("");
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const firstInputRef = useRef<HTMLTextAreaElement>(null);

  const trimmedBrought = whatBroughtYouHere.trim();
  const trimmedSuggest = anythingYouSuggest.trim();

  const isBroughtEmpty = trimmedBrought.length === 0;
  const isBroughtTooLong = whatBroughtYouHere.length > 500;
  const isSuggestTooLong = anythingYouSuggest.length > 2000;
  const isFormValid = !isBroughtEmpty && !isBroughtTooLong && !isSuggestTooLong;

  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;

      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          dismiss();
          return;
        }

        if (e.key === "Tab" && dialogRef.current) {
          const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstEl = focusableElements[0];
          const lastEl = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
        previousActiveElementRef.current = null;
      }
    }
  }, [isOpen, dismiss]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setTouched(true);
      setServerError(null);

      if (!isFormValid || isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      try {
        const baseUrl = getApiBaseUrl();
        const response = await fetch(`${baseUrl}/api/feedback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            whatBroughtYouHere: trimmedBrought,
            anythingYouSuggest: trimmedSuggest.length > 0 ? trimmedSuggest : undefined,
          }),
        });

        if (response.status === 201) {
          setIsSuccess(true);
          trackEvent("feedback_submission");
          complete();
          setTimeout(() => {
            dismiss();
          }, 2000);
        } else if (response.status === 400) {
          setServerError("Please check your input and try again.");
        } else if (response.status === 413) {
          setServerError("Submission is too large. Please shorten your response.");
        } else if (response.status === 415) {
          setServerError("An unexpected error occurred. Please try again.");
        } else if (response.status === 429) {
          setServerError("Please try again later.");
        } else {
          setServerError("Something went wrong. Please try again.");
        }
      } catch {
        setServerError("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isFormValid, isSubmitting, trimmedBrought, trimmedSuggest, complete, dismiss]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.15 }}
            onClick={dismiss}
            aria-hidden="true"
            className="fixed inset-0 bg-portfolio-ink/30 backdrop-blur-[2px]"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-prompt-title"
            aria-describedby="feedback-prompt-desc"
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:max-w-[460px] max-h-[85vh] overflow-y-auto rounded-t-xl sm:rounded-portfolio border-t sm:border border-portfolio-line bg-portfolio-surface p-6 shadow-soft"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="feedback-prompt-title"
                  className="text-base font-semibold text-portfolio-ink"
                >
                  Have a minute?
                </h2>
                <p
                  id="feedback-prompt-desc"
                  className="mt-1 text-xs sm:text-sm text-portfolio-muted leading-relaxed"
                >
                  I&apos;d like to know what brought you here and whether there&apos;s anything I could improve.
                </p>
              </div>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Close feedback prompt"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-portfolio border border-portfolio-line/50 text-portfolio-muted hover:border-portfolio-ink/40 hover:text-portfolio-ink focus-visible:outline-2 focus-visible:outline-portfolio-accent transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {isSuccess ? (
              <div className="mt-6 py-4 text-center">
                <p className="text-sm font-medium text-portfolio-ink">
                  Thanks for the feedback.
                </p>
                <p className="mt-1 text-xs text-portfolio-muted">
                  It helps me improve the site.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <label
                      htmlFor="feedback-what-brought-you-here"
                      className="text-xs font-medium text-portfolio-ink"
                    >
                      What brought you here? <span className="text-portfolio-warm">*</span>
                    </label>
                    <span className="text-[11px] text-portfolio-muted">
                      {whatBroughtYouHere.length}/500
                    </span>
                  </div>
                  <textarea
                    ref={firstInputRef}
                    id="feedback-what-brought-you-here"
                    name="whatBroughtYouHere"
                    rows={3}
                    value={whatBroughtYouHere}
                    onChange={(e) => setWhatBroughtYouHere(e.target.value)}
                    disabled={isSubmitting}
                    aria-describedby={
                      touched && (isBroughtEmpty || isBroughtTooLong)
                        ? "feedback-what-brought-error"
                        : undefined
                    }
                    className="w-full resize-none rounded-portfolio border border-portfolio-line bg-portfolio-bg/40 px-3 py-2 text-sm text-portfolio-ink placeholder:text-portfolio-muted/60 focus-visible:outline-2 focus-visible:outline-portfolio-accent transition-colors disabled:opacity-50"
                    placeholder="E.g., came across your portfolio on GitHub, reviewing resumes..."
                  />
                  {touched && isBroughtEmpty && (
                    <p
                      id="feedback-what-brought-error"
                      className="mt-1 text-xs text-portfolio-warm"
                    >
                      Please tell me what brought you here.
                    </p>
                  )}
                  {touched && isBroughtTooLong && (
                    <p
                      id="feedback-what-brought-error"
                      className="mt-1 text-xs text-portfolio-warm"
                    >
                      Please keep this within 500 characters.
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <label
                      htmlFor="feedback-anything-you-suggest"
                      className="text-xs font-medium text-portfolio-ink"
                    >
                      Anything you&apos;d suggest.{" "}
                      <span className="text-[11px] font-normal text-portfolio-muted">
                        (optional)
                      </span>
                    </label>
                    <span className="text-[11px] text-portfolio-muted">
                      {anythingYouSuggest.length}/2000
                    </span>
                  </div>
                  <textarea
                    id="feedback-anything-you-suggest"
                    name="anythingYouSuggest"
                    rows={3}
                    value={anythingYouSuggest}
                    onChange={(e) => setAnythingYouSuggest(e.target.value)}
                    disabled={isSubmitting}
                    aria-describedby={
                      touched && isSuggestTooLong
                        ? "feedback-suggest-error"
                        : undefined
                    }
                    className="w-full resize-none rounded-portfolio border border-portfolio-line bg-portfolio-bg/40 px-3 py-2 text-sm text-portfolio-ink placeholder:text-portfolio-muted/60 focus-visible:outline-2 focus-visible:outline-portfolio-accent transition-colors disabled:opacity-50"
                    placeholder="Ideas, observations, or things that could be clearer..."
                  />
                  {touched && isSuggestTooLong && (
                    <p
                      id="feedback-suggest-error"
                      className="mt-1 text-xs text-portfolio-warm"
                    >
                      Please keep this within 2000 characters.
                    </p>
                  )}
                </div>

                {serverError && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="rounded-portfolio border border-portfolio-warm/30 bg-portfolio-warm/5 px-3 py-2 text-xs text-portfolio-warm"
                  >
                    {serverError}
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={dismiss}
                    disabled={isSubmitting}
                    className="inline-flex min-h-10 items-center justify-center rounded-portfolio border border-portfolio-line bg-portfolio-surface px-4 text-xs sm:text-sm font-medium text-portfolio-ink hover:border-portfolio-ink/40 hover:bg-portfolio-ink/[0.04] focus-visible:outline-2 focus-visible:outline-portfolio-accent transition-colors disabled:opacity-50"
                  >
                    Not now
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || (touched && !isFormValid)}
                    className="inline-flex min-h-10 items-center justify-center rounded-portfolio border border-portfolio-ink bg-portfolio-ink px-5 text-xs sm:text-sm font-medium text-portfolio-surface hover:bg-[#252825] hover:border-[#252825] focus-visible:outline-2 focus-visible:outline-portfolio-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send feedback"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
