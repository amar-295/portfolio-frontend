import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import { person } from "../content";

export const metadata: Metadata = {
  title: "Privacy — Amarnath Sharma",
  description:
    "Privacy information for Amarnath Sharma's portfolio, including contact submissions and anonymous first-party analytics.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-portfolio-bg text-portfolio-ink">
      <header className="sticky top-0 z-40 border-b border-portfolio-line bg-portfolio-bg/92 px-4 py-3.5 backdrop-blur sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-portfolio-muted transition-colors hover:text-portfolio-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
          >
            <ArrowLeft
              className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span>Back to portfolio</span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-portfolio-muted sm:text-sm">
            {person.name}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <article className="space-y-12">
          <header className="space-y-3 border-b border-portfolio-line pb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-portfolio-ink md:text-5xl">
              Privacy
            </h1>
            <p className="text-xs font-medium uppercase tracking-wider text-portfolio-muted">
              Last updated: September 13, 2026
            </p>
            <p className="text-base leading-relaxed text-portfolio-muted md:text-lg">
              This portfolio is designed to present my software development work
              while respecting visitor privacy. It collects only the limited
              information necessary to receive contact inquiries and to
              understand general site usage through anonymous, first-party
              analytics.
            </p>
          </header>

          <section aria-labelledby="collection-heading" className="space-y-6">
            <h2
              id="collection-heading"
              className="text-xl font-semibold tracking-tight text-portfolio-ink md:text-2xl"
            >
              What this site collects
            </h2>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-portfolio-ink">
                Contact messages
              </h3>
              <p className="text-sm leading-relaxed text-portfolio-muted md:text-base">
                When you voluntarily use the contact form, the site sends the
                following information to the portfolio backend:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-portfolio-muted marker:text-portfolio-accent md:text-base">
                <li>
                  <strong className="font-medium text-portfolio-ink">Name:</strong>{" "}
                  used to address you in a reply.
                </li>
                <li>
                  <strong className="font-medium text-portfolio-ink">Email address:</strong>{" "}
                  used to send a response to your inquiry.
                </li>
                <li>
                  <strong className="font-medium text-portfolio-ink">Message:</strong>{" "}
                  the communication you choose to write.
                </li>
              </ul>
              <p className="text-sm leading-relaxed text-portfolio-muted md:text-base">
                This information is used solely to read and respond to your
                communication. No specific retention period has been defined for
                stored messages.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-portfolio-line/60">
              <h3 className="text-base font-semibold text-portfolio-ink">
                Anonymous analytics
              </h3>
              <p className="text-sm leading-relaxed text-portfolio-muted md:text-base">
                The portfolio uses a custom first-party analytics system to
                understand which sections and projects are viewed and which
                interactive actions are helpful. The system records high-level
                events such as:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-portfolio-muted marker:text-portfolio-accent md:text-base">
                <li>Page views</li>
                <li>Section views (About, Work, Experience, Contact)</li>
                <li>Project views</li>
                <li>Resume link clicks</li>
                <li>GitHub profile clicks</li>
                <li>LinkedIn profile clicks</li>
                <li>Live project demo clicks</li>
                <li>Successful contact submissions</li>
                <li>Successful feedback submissions</li>
              </ul>
              <p className="text-sm leading-relaxed text-portfolio-muted md:text-base">
                Analytics events record only the event name, a server-generated
                timestamp, and public project titles or identifiers when
                relevant.
              </p>
            </div>
          </section>

          <section aria-labelledby="privacy-details-heading" className="space-y-4 border-t border-portfolio-line pt-8">
            <h2
              id="privacy-details-heading"
              className="text-xl font-semibold tracking-tight text-portfolio-ink md:text-2xl"
            >
              Privacy and analytics details
            </h2>
            <p className="text-sm leading-relaxed text-portfolio-muted md:text-base">
              The analytics system is built strictly for privacy-conscious
              portfolio measurement:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-portfolio-muted marker:text-portfolio-accent md:text-base">
              <li>No advertising trackers or marketing pixels are used.</li>
              <li>No third-party analytics platforms (such as Google Analytics) are integrated.</li>
              <li>No analytics cookies are placed on your device.</li>
              <li>The analytics system does not use persistent cross-site identifiers or create visitor profiles.</li>
              <li>
                An anonymous session ID is stored in browser sessionStorage for
                the duration of your browser session to correlate events within a
                single visit. This ID is randomly generated and is not associated
                with a name, email address, or personal profile.
              </li>
              <li>
                Deduplication state for analytics (preventing repeated event
                counts for the same section or project during a view) is held
                strictly in temporary JavaScript memory and resets when the page
                is closed or reloaded.
              </li>
              <li>No browser fingerprinting is used.</li>
              <li>No geolocation is collected by the frontend analytics implementation.</li>
              <li>No user-agent parsing is performed by the frontend analytics implementation.</li>
              <li>Analytics does not collect contact form contents.</li>
              <li>Analytics does not collect feedback prompt answers.</li>
              <li>Project analytics use only public project identifiers and titles.</li>
            </ul>
            <p className="text-xs leading-relaxed text-portfolio-muted">
              The frontend implementation does not explicitly transmit IP addresses,
              user-agent strings, or location coordinates. As with standard web
              traffic, standard network transmissions between your browser and
              the hosting server include the routing information required to
              deliver web content.
            </p>
          </section>

          <section aria-labelledby="feedback-heading" className="space-y-4 border-t border-portfolio-line pt-8">
            <h2
              id="feedback-heading"
              className="text-xl font-semibold tracking-tight text-portfolio-ink md:text-2xl"
            >
              Feedback prompt
            </h2>
            <p className="text-sm leading-relaxed text-portfolio-muted md:text-base">
              The portfolio includes an optional feedback dialog that asks:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-portfolio-muted marker:text-portfolio-accent md:text-base">
              <li>&ldquo;What brought you here?&rdquo;</li>
              <li>&ldquo;Anything you&apos;d suggest.&rdquo;</li>
            </ul>
            <p className="text-sm leading-relaxed text-portfolio-muted md:text-base">
              Feedback responses are submitted anonymously to the backend and are
              not linked to any contact form data. The feedback prompt uses
              session-only browser storage to avoid repeatedly showing the prompt
              during the same visit.
            </p>
          </section>

          <section aria-labelledby="storage-heading" className="space-y-4 border-t border-portfolio-line pt-8">
            <h2
              id="storage-heading"
              className="text-xl font-semibold tracking-tight text-portfolio-ink md:text-2xl"
            >
              Cookies and browser storage
            </h2>
            <p className="text-sm leading-relaxed text-portfolio-muted md:text-base">
              Browser storage on this site is kept to a minimum:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-portfolio-muted marker:text-portfolio-accent md:text-base">
              <li>
                <strong className="font-medium text-portfolio-ink">Cookies:</strong>{" "}
                The public portfolio does not use analytics cookies or persistent tracking cookies.
              </li>
              <li>
                <strong className="font-medium text-portfolio-ink">Session storage:</strong>{" "}
                Browser sessionStorage is used only for the current browser session to maintain
                the anonymous analytics session ID and to suppress repeat feedback prompts. It
                is automatically cleared when you close the tab or window.
              </li>
              <li>
                <strong className="font-medium text-portfolio-ink">Local storage &amp; IndexedDB:</strong>{" "}
                The public portfolio does not use localStorage or IndexedDB for analytics or user tracking.
              </li>
              <li>
                <strong className="font-medium text-portfolio-ink">Contact form storage:</strong>{" "}
                The contact form does not persist form entries in browser storage.
              </li>
            </ul>
          </section>

          <section aria-labelledby="sharing-heading" className="space-y-4 border-t border-portfolio-line pt-8">
            <h2
              id="sharing-heading"
              className="text-xl font-semibold tracking-tight text-portfolio-ink md:text-2xl"
            >
              Data sharing and external services
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-portfolio-muted marker:text-portfolio-accent md:text-base">
              <li>
                Contact submissions are sent directly to the portfolio&apos;s own backend API.
              </li>
              <li>
                Anonymous analytics events are sent directly to the portfolio&apos;s own analytics backend.
              </li>
              <li>
                No third-party analytics provider is integrated, and data is not sold or shared with advertisers.
              </li>
              <li>
                Links to GitHub, LinkedIn, email, and live project demos navigate to external services.
                Interactions on those external platforms are subject to their respective privacy terms.
              </li>
            </ul>
          </section>

          <section aria-labelledby="security-heading" className="space-y-3 border-t border-portfolio-line pt-8">
            <h2
              id="security-heading"
              className="text-xl font-semibold tracking-tight text-portfolio-ink md:text-2xl"
            >
              Security
            </h2>
            <p className="text-sm leading-relaxed text-portfolio-muted md:text-base">
              Reasonable technical measures, including encryption in transit
              (HTTPS) and input validation on backend endpoints, are implemented
              to protect information submitted through the site.
            </p>
          </section>

          <section aria-labelledby="contact-heading" className="space-y-3 border-t border-portfolio-line pt-8">
            <h2
              id="contact-heading"
              className="text-xl font-semibold tracking-tight text-portfolio-ink md:text-2xl"
            >
              Contact
            </h2>
            <p className="text-sm leading-relaxed text-portfolio-muted md:text-base">
              If you have any questions about this privacy statement or wish to
              reach out regarding submitted information, you can send an email to{" "}
              <a
                href={`mailto:${person.email}`}
                className="font-medium text-portfolio-accent underline underline-offset-4 transition-colors hover:text-portfolio-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
              >
                {person.email}
              </a>
              .
            </p>
          </section>
        </article>

        <Footer showBackToHome={true} />
      </main>
    </div>
  );
}
