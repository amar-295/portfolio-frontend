"use client";

import React, { useState, useCallback } from "react";
import { trackEvent } from "../lib/analytics";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

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

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  const isNameEmpty = trimmedName.length === 0;
  const isNameTooLong = name.length > 100;
  const nameError = touched.name
    ? isNameEmpty
      ? "Please enter your name."
      : isNameTooLong
      ? "Please keep your name within 100 characters."
      : null
    : null;

  const isEmailEmpty = trimmedEmail.length === 0;
  const isEmailTooLong = email.length > 254;
  const isEmailInvalid = !isEmailEmpty && !EMAIL_REGEX.test(trimmedEmail);
  const emailError = touched.email
    ? isEmailEmpty
      ? "Please enter your email."
      : isEmailTooLong
      ? "Please keep your email within 254 characters."
      : isEmailInvalid
      ? "Please enter a valid email address."
      : null
    : null;

  const isMessageEmpty = trimmedMessage.length === 0;
  const isMessageTooLong = message.length > 5000;
  const messageError = touched.message
    ? isMessageEmpty
      ? "Please enter a message."
      : isMessageTooLong
      ? "Please keep your message within 5000 characters."
      : null
    : null;

  const isFormValid =
    !isNameEmpty &&
    !isNameTooLong &&
    !isEmailEmpty &&
    !isEmailTooLong &&
    !isEmailInvalid &&
    !isMessageEmpty &&
    !isMessageTooLong;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      setTouched({
        name: true,
        email: true,
        message: true,
      });
      setServerError(null);

      if (!isFormValid || isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      try {
        const baseUrl = getApiBaseUrl();
        const response = await fetch(`${baseUrl}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
          }),
        });

        if (response.status === 201) {
          setIsSuccess(true);
          trackEvent("contact_submission");
          setName("");
          setEmail("");
          setMessage("");
          setTouched({
            name: false,
            email: false,
            message: false,
          });
        } else if (response.status === 400) {
          setServerError("Please check your information and try again.");
        } else if (response.status === 413) {
          setServerError("Message is too large. Please shorten it.");
        } else if (response.status === 415) {
          setServerError(
            "Something went wrong while sending your message. Please try again."
          );
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
    [isFormValid, isSubmitting, trimmedName, trimmedEmail, trimmedMessage]
  );

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-portfolio border border-portfolio-line bg-portfolio-surface p-6 sm:p-8"
      >
        <h3 className="text-base font-semibold text-portfolio-ink">
          Message sent.
        </h3>
        <p className="mt-1 text-sm text-portfolio-muted leading-relaxed">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs font-medium text-portfolio-ink mb-1.5"
        >
          Name <span className="text-portfolio-warm">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          disabled={isSubmitting}
          onChange={(e) => {
            setName(e.target.value);
            if (!touched.name) setTouched((prev) => ({ ...prev, name: true }));
          }}
          aria-required="true"
          aria-invalid={nameError !== null}
          aria-describedby={nameError ? "contact-name-error" : undefined}
          className="w-full rounded-portfolio border border-portfolio-line bg-portfolio-bg/40 px-3.5 py-2.5 text-sm text-portfolio-ink placeholder:text-portfolio-muted/60 focus-visible:outline-2 focus-visible:outline-portfolio-accent transition-colors disabled:opacity-50"
          placeholder="Your name"
        />
        {nameError && (
          <p id="contact-name-error" className="mt-1 text-xs text-portfolio-warm">
            {nameError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs font-medium text-portfolio-ink mb-1.5"
        >
          Email <span className="text-portfolio-warm">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          disabled={isSubmitting}
          onChange={(e) => {
            setEmail(e.target.value);
            if (!touched.email) setTouched((prev) => ({ ...prev, email: true }));
          }}
          aria-required="true"
          aria-invalid={emailError !== null}
          aria-describedby={emailError ? "contact-email-error" : undefined}
          className="w-full rounded-portfolio border border-portfolio-line bg-portfolio-bg/40 px-3.5 py-2.5 text-sm text-portfolio-ink placeholder:text-portfolio-muted/60 focus-visible:outline-2 focus-visible:outline-portfolio-accent transition-colors disabled:opacity-50"
          placeholder="you@example.com"
        />
        {emailError && (
          <p id="contact-email-error" className="mt-1 text-xs text-portfolio-warm">
            {emailError}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <label
            htmlFor="contact-message"
            className="text-xs font-medium text-portfolio-ink"
          >
            Message <span className="text-portfolio-warm">*</span>
          </label>
          <span className="text-[11px] text-portfolio-muted">
            {message.length}/5000
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          autoComplete="off"
          value={message}
          disabled={isSubmitting}
          onChange={(e) => {
            setMessage(e.target.value);
            if (!touched.message)
              setTouched((prev) => ({ ...prev, message: true }));
          }}
          aria-required="true"
          aria-invalid={messageError !== null}
          aria-describedby={messageError ? "contact-message-error" : undefined}
          className="w-full resize-none rounded-portfolio border border-portfolio-line bg-portfolio-bg/40 px-3.5 py-2.5 text-sm text-portfolio-ink placeholder:text-portfolio-muted/60 focus-visible:outline-2 focus-visible:outline-portfolio-accent transition-colors disabled:opacity-50"
          placeholder="What would you like to discuss?"
        />
        {messageError && (
          <p
            id="contact-message-error"
            className="mt-1 text-xs text-portfolio-warm"
          >
            {messageError}
          </p>
        )}
      </div>

      {serverError && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-portfolio border border-portfolio-warm/30 bg-portfolio-warm/5 px-3.5 py-2.5 text-xs text-portfolio-warm"
        >
          {serverError}
        </div>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting || (touched.name && touched.email && touched.message && !isFormValid)}
          className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-portfolio border border-portfolio-ink bg-portfolio-ink px-6 text-sm font-medium text-portfolio-surface hover:bg-[#252825] hover:border-[#252825] focus-visible:outline-2 focus-visible:outline-portfolio-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
