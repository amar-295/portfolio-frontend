import Link from "next/link";
import { person } from "../content";

interface FooterProps {
  showBackToHome?: boolean;
}

export default function Footer({ showBackToHome = false }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-portfolio-line pt-8 pb-12 text-xs text-portfolio-muted">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>© {new Date().getFullYear()} {person.name}. All rights reserved.</p>
        <div className="flex items-center gap-6">
          {showBackToHome ? (
            <Link
              href="/"
              className="underline underline-offset-4 transition-colors hover:text-portfolio-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
            >
              Back to portfolio
            </Link>
          ) : (
            <Link
              href="/privacy"
              className="underline underline-offset-4 transition-colors hover:text-portfolio-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
            >
              Privacy
            </Link>
          )}
          <a
            href={`mailto:${person.email}`}
            className="underline underline-offset-4 transition-colors hover:text-portfolio-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
