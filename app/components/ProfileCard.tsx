"use client";

import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import avatar from "@/public/avatar.webp";
import Button from "./Button";
import { person, resumeHref, socials } from "../content";
import Navigation from "./Navigation";
import { trackEvent } from "../lib/analytics";

const socialLinks = [
  {
    label: "Email",
    href: `mailto:${person.email}`,
    icon: Mail,
  },
  ...socials.map((social) => ({
    label: social.label,
    href: social.href,
    icon: social.label === "GitHub" ? FaGithub : FaLinkedin,
  })),
];

export default function ProfileCard() {
  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col justify-between gap-6">
      <div>
        <a
          href="#about"
          className="group inline-flex items-center gap-4 rounded-portfolio"
          aria-label={`${person.name}, ${person.role}`}
        >
          <span className="relative block size-14 overflow-hidden rounded-portfolio lg:size-16">
            <Image
              src={avatar}
              alt="Profile illustration of Amarnath Sharma"
              fill
              priority
              sizes="64px"
              className="object-cover"
            />
          </span>
          <span>
            <span className="block text-lg font-semibold text-portfolio-ink">
              {person.name}
            </span>
            <span className="mt-0.5 block text-sm text-portfolio-muted">
              {person.role}
            </span>
          </span>
        </a>

        <p className="mt-5 text-xl font-semibold leading-snug text-portfolio-ink lg:text-2xl">
          {person.sidebarStatement}
        </p>

        <div className="mt-5">
          <Navigation />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <Button
              key={label}
              href={href}
              variant="subtle-icon"
              size="icon"
              aria-label={label}
              title={label}
              icon={<Icon aria-hidden="true" size={18} />}
              animateIcon={false}
              onClick={() => {
                if (label === "GitHub") {
                  trackEvent("github_click");
                } else if (label === "LinkedIn") {
                  trackEvent("linkedin_click");
                }
              }}
            />
          ))}
        </div>

        {resumeHref ? (
          <Button
            href={resumeHref}
            variant="primary"
            size="default"
            icon={<ArrowUpRight aria-hidden="true" size={16} />}
            onClick={() => trackEvent("resume_click")}
          >
            Resume
          </Button>
        ) : (
          <span
            aria-disabled="true"
            title="Add public/resume.pdf to enable this action"
            className="inline-flex min-h-11 cursor-not-allowed items-center gap-2 rounded-portfolio border border-portfolio-line px-5 text-sm font-medium text-portfolio-muted opacity-50"
          >
            Resume <ArrowUpRight aria-hidden="true" size={16} />
          </span>
        )}
      </div>
    </div>
  );
}
