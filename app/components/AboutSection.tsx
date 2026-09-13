import { ArrowUpRight } from "lucide-react";
import Button from "./Button";
import HeroAnimation from "./HeroAnimation";
import { person, skills } from "../content";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="grid min-h-[calc(100svh-var(--header-height))] items-center gap-10 py-12 md:min-h-[calc(100vh-64px)] md:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.78fr)] md:py-4"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-portfolio-accent">
          {person.role}
        </p>
        <h1
          id="about-title"
          className="mt-4 text-4xl font-semibold leading-[1.02] text-portfolio-ink sm:text-5xl lg:text-6xl"
        >
          {person.name}
        </h1>
        <p className="mt-5 max-w-2xl text-2xl font-medium leading-[1.25] text-portfolio-ink md:text-3xl">
          Building modern web applications, responsive interfaces, reliable APIs, and database-backed products.
        </p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-portfolio-muted md:text-lg md:leading-8">
          I build web applications from the interface down to the API, working mainly with React, Node.js, and databases. I&apos;m also interested in using AI where it genuinely makes a product better. Open to software engineering roles and select client projects.
        </p>
        <div
          className="mt-5 flex max-w-[370px] flex-wrap gap-[7px]"
          aria-label="Core technologies"
        >
          {skills.core.map((skill, index) => (
            <span
              key={skill}
              className={`inline-flex items-center rounded-[6px] border border-[#DCDDD8] bg-[#F4F5F3] px-[10px] py-[5px] text-[12.5px] leading-[1.25] text-[#343632] cursor-default select-none ${
                index < 4 ? "font-medium" : "font-normal"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            href="#work"
            variant="primary"
            size="default"
            icon={<ArrowUpRight aria-hidden="true" size={16} />}
          >
            View Work
          </Button>
          <Button
            href="#contact"
            variant="secondary"
            size="default"
          >
            Contact
          </Button>
        </div>
      </div>

      <div className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-portfolio border border-portfolio-line/60 bg-[#F1F5F3] p-6 sm:min-h-[440px] sm:p-8 md:min-h-[620px]">
        <div className="flex flex-1 items-center justify-center min-h-0 w-full py-2">
          <HeroAnimation />
        </div>
        <div className="border-t border-portfolio-line/60 pt-4 text-portfolio-ink">
          <p className="max-w-[18rem] text-base font-medium leading-snug md:text-lg md:leading-6">
            Practical full-stack work, from interface detail to API behavior.
          </p>
        </div>
      </div>
    </section>
  );
}
