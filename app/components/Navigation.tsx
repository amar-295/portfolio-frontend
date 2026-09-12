"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { navigation } from "../content";

export default function Navigation({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const [active, setActive] = useState("about");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Sync initial active state if a hash is present on load
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.slice(1);
      if (navigation.some((item) => item.href === `#${hashId}`)) {
        setActive(hashId);
      }
    }

    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const visibleSections = new Map<string, number>();

    const checkBoundaries = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // When at the very bottom of the document, activate the last section
      if (windowHeight + scrollY >= docHeight - 40) {
        const last = navigation[navigation.length - 1];
        if (last) {
          setActive(last.href.slice(1));
          return true;
        }
      }

      // When at the very top of the document, activate the first section
      if (scrollY < 80) {
        const first = navigation[0];
        if (first) {
          setActive(first.href.slice(1));
          return true;
        }
      }

      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRect.height);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        // If top/bottom boundary condition is met, let boundary check rule
        if (checkBoundaries()) {
          return;
        }

        let bestId = "";
        let maxHeight = 0;
        visibleSections.forEach((height, id) => {
          if (height > maxHeight) {
            maxHeight = height;
            bestId = id;
          }
        });

        if (bestId) {
          setActive(bestId);
        }
      },
      {
        rootMargin: "-18% 0px -42% 0px",
        threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      checkBoundaries();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isDesktop = variant === "desktop";

  return (
    <nav
      aria-label="Primary"
      className={
        isDesktop ? "w-full" : "flex w-full items-center justify-between gap-2"
      }
    >
      <div
        className={
          isDesktop
            ? "flex flex-col gap-0.5 rounded-portfolio border border-portfolio-line/50 bg-portfolio-surface/60 p-1"
            : "flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-portfolio border border-portfolio-line/50 bg-portfolio-surface/60 p-1"
        }
      >
        {navigation.map((item) => {
          const id = item.href.slice(1);
          const isActive = active === id;

          return (
            <motion.a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className={`group relative flex items-center select-none rounded-[6px] text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent focus-visible:z-20 ${
                isDesktop
                  ? "min-h-9.5 px-3 md:px-3.5 py-1.5"
                  : "min-h-9 px-3.5 py-1.5 whitespace-nowrap"
              } ${
                isActive
                  ? "text-portfolio-ink font-semibold"
                  : "text-portfolio-muted hover:text-portfolio-ink hover:bg-portfolio-ink/[0.035]"
              }`}
            >
              {isActive ? (
                <motion.div
                  className="absolute inset-0 rounded-[6px] bg-[#edeae0]"
                  layoutId={`active-indicator-${variant}`}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 30 }
                  }
                >
                  {isDesktop ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 h-3.5 w-[2.5px] rounded-full bg-portfolio-accent"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-portfolio-accent"
                    />
                  )}
                </motion.div>
              ) : null}

              <span
                className={`relative z-10 transition-transform duration-150 ease-out ${
                  isDesktop && !isActive
                    ? "group-hover:translate-x-0.5"
                    : ""
                } ${isDesktop && isActive ? "pl-2" : ""}`}
              >
                {item.label}
              </span>
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
}
