"use client";

import Image, { type StaticImageData } from "next/image";
import { useMemo, useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FaGithub } from "react-icons/fa";
import crmImage from "@/public/projects/crm.webp";
import researchSynthesizerImage from "@/public/projects/research-synthesizer.webp";
import changelogHubImage from "@/public/projects/changeloghub.webp";
import Button from "./Button";
import { projects } from "../content";
import { trackEvent } from "../lib/analytics";

const projectImages: StaticImageData[] = [
  crmImage,
  researchSynthesizerImage,
  changelogHubImage,
];

export default function WorkSection() {
  const [current, setCurrent] = useState(0);
  const [isWorkInView, setIsWorkInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const viewedProjectsRef = useRef<Set<string>>(new Set());

  const reduceMotion = useReducedMotion();
  const project = projects[current];

  const image = projectImages[current];
  const nextProjectTitle = useMemo(
    () => projects[(current + 1) % projects.length].title,
    [current],
  );

  function goTo(index: number) {
    setCurrent((index + projects.length) % projects.length);
  }

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsWorkInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isWorkInView) {
      const activeProject = projects[current];
      if (!viewedProjectsRef.current.has(activeProject.number)) {
        viewedProjectsRef.current.add(activeProject.number);
        trackEvent("project_view", {
          metadata: {
            projectId: activeProject.number,
            projectTitle: activeProject.title,
          },
        });
      }
    }
  }, [isWorkInView, current]);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="work-title"
      className="border-t border-portfolio-line py-20 md:py-24"
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-portfolio-accent">Work</p>
          <h2
            id="work-title"
            className="mt-3 text-3xl font-semibold leading-tight text-portfolio-ink md:text-5xl"
          >
            Three engineering case studies, kept concrete.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-portfolio-muted">
          Problem, implementation, architecture, and outcome are summarized from
          the repositories and kept focused on inspectable engineering work.
        </p>
      </div>

      <div className="overflow-hidden rounded-portfolio border border-portfolio-line bg-portfolio-surface">
        <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-portfolio-line bg-[#eeece4] sm:aspect-[1.5] lg:aspect-auto lg:h-full lg:border-b-0 lg:border-r">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.number}
                className="absolute inset-0 flex items-center justify-center p-1 sm:p-2 lg:p-4"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 45vw"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-8 xl:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${project.number}-copy`}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-portfolio-muted">
                    Project {project.number} / 0{projects.length}
                  </p>
                  <span className="rounded-full bg-portfolio-accent/10 px-2.5 py-0.5 text-xs font-medium text-portfolio-accent">
                    Engineering Case Study
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-semibold leading-tight text-portfolio-ink sm:text-3xl lg:text-4xl">
                  {project.title}
                </h3>

                <div className="mt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-portfolio-accent">
                    Problem
                  </span>
                  <p className="mt-1 text-base font-medium leading-snug text-portfolio-ink">
                    {project.problem}
                  </p>
                </div>

                <div className="mt-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-portfolio-muted">
                    What I Built
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-portfolio-muted">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-portfolio-muted">
                    Core Technologies
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-portfolio border border-portfolio-line bg-portfolio-surface px-2.5 py-1 text-xs font-medium text-portfolio-ink"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${project.number}-details`}
                  className="grid gap-3.5 border-y border-portfolio-line py-4"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-portfolio-ink">
                      Architecture & Decisions
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-portfolio-muted sm:text-sm">
                      {project.architecture}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-portfolio-ink">
                      Outcome
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-portfolio-muted sm:text-sm">
                      {project.outcome}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {project.liveUrl ? (
                    <Button
                      href={project.liveUrl}
                      variant="primary"
                      size="sm"
                      icon={<ArrowUpRight aria-hidden="true" size={15} />}
                      onClick={() => {
                        trackEvent("live_demo_click", {
                          metadata: {
                            projectId: project.number,
                            projectTitle: project.title,
                          },
                        });
                      }}
                    >
                      Live Demo
                    </Button>
                  ) : null}
                  <Button
                    href={project.githubUrl}
                    variant="secondary"
                    size="sm"
                    icon={<FaGithub aria-hidden="true" size={15} />}
                    iconPosition="left"
                    animateIcon={false}
                    aria-label={`Open ${project.title} on GitHub`}
                    onClick={() => {
                      trackEvent("github_click", {
                        metadata: {
                          projectId: project.number,
                          projectTitle: project.title,
                        },
                      });
                    }}
                  >
                    GitHub
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="icon"
                    size="icon"
                    onClick={() => goTo(current - 1)}
                    aria-label="Previous project"
                    title="Previous project"
                    icon={<ArrowLeft aria-hidden="true" size={16} />}
                    animateIcon={false}
                  />
                  <Button
                    variant="icon"
                    size="icon"
                    onClick={() => goTo(current + 1)}
                    aria-label={`Next project: ${nextProjectTitle}`}
                    title={`Next project: ${nextProjectTitle}`}
                    icon={<ArrowRight aria-hidden="true" size={16} />}
                    animateIcon={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
