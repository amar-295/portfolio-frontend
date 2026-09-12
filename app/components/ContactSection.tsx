import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { contact, socials } from "../content";

const links = [
  {
    label: "Email",
    href: `mailto:${contact.email}`,
    icon: Mail,
    ariaLabel: `Send email to ${contact.email}`,
  },
  ...socials.map((social) => ({
    label: social.label,
    href: social.href,
    icon: social.label === "GitHub" ? FaGithub : FaLinkedin,
    ariaLabel: `Open ${social.label} profile`,
  })),
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-portfolio-line py-20 md:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-medium text-portfolio-accent">Contact</p>
          <h2
            id="contact-title"
            className="mt-3 text-4xl font-semibold leading-tight text-portfolio-ink md:text-6xl"
          >
            Let us build something precise.
          </h2>
        </div>

        <div className="space-y-4">
          <p className="max-w-xl text-lg leading-8 text-portfolio-muted">
            Open to software-development roles where clean implementation,
            product thinking, and reliable delivery matter.
          </p>
          <div className="divide-y divide-portfolio-line border-y border-portfolio-line">
            {links.map(({ label, href, icon: Icon, ariaLabel }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={ariaLabel}
                className="group flex min-h-16 items-center justify-between gap-4 rounded-portfolio py-4 text-base font-medium text-portfolio-ink transition-colors hover:text-portfolio-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
              >
                <span className="inline-flex min-w-0 items-center gap-3">
                  <Icon
                    aria-hidden="true"
                    size={20}
                    className="shrink-0 text-portfolio-muted transition-colors group-hover:text-portfolio-accent"
                  />
                  <span className="min-w-0 break-words">{label}</span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={18}
                  className="shrink-0 text-portfolio-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
