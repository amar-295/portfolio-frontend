import { ArrowUpRight } from "lucide-react";
import { achievements, education, experience } from "../content";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-t border-portfolio-line py-20 md:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-sm font-medium text-portfolio-accent">
            Experience
          </p>
          <h2
            id="experience-title"
            className="mt-3 text-3xl font-semibold leading-tight text-portfolio-ink md:text-5xl"
          >
            Practical production work, kept specific.
          </h2>
        </div>

        <div className="space-y-12">
          <div className="relative">
            <div className="absolute bottom-0 left-[7px] top-2 w-px bg-portfolio-line" />
            <ol className="space-y-10">
              {experience.map((item) => (
                <li
                  key={`${item.company}-${item.role}`}
                  className="relative pl-9"
                >
                  <span className="absolute left-0 top-2 size-4 rounded-full border border-portfolio-accent bg-portfolio-bg" />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold leading-7 text-portfolio-ink">
                        {item.company}
                      </h3>
                      <p className="mt-1 text-base font-medium text-portfolio-muted">
                        {item.role}
                      </p>
                      <p className="mt-1 text-sm text-portfolio-muted">
                        {item.location}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-portfolio-muted">
                      {item.startDate} - {item.endDate}
                    </p>
                  </div>
                  <p className="mt-4 text-base leading-7 text-portfolio-muted">
                    {item.description}
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-portfolio-muted">
                    {item.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-portfolio border border-portfolio-line px-3 py-1.5 text-sm font-medium text-portfolio-muted"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6 border-t border-portfolio-line pt-8 sm:grid-cols-2">
            {education.map((item) => (
              <div key={item.institution}>
                <p className="text-sm font-medium text-portfolio-accent">
                  Education
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-7 text-portfolio-ink">
                  {item.program}
                </h3>
                <p className="mt-2 text-base leading-7 text-portfolio-muted">
                  {item.institution} ({item.affiliation})
                </p>
                <p className="mt-2 text-sm font-medium text-portfolio-muted">
                  {item.startDate} - {item.endDate}
                </p>
              </div>
            ))}

            <div>
              <p className="text-sm font-medium text-portfolio-accent">
                Achievement
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-portfolio-muted">
                {achievements.map((achievement) => (
                  <li key={achievement.title}>
                    {achievement.url ? (
                      <a
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline text-portfolio-muted transition-colors duration-150 hover:text-portfolio-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent rounded-sm"
                        aria-label={`${achievement.title} (opens verified GitHub credential in a new tab)`}
                      >
                        <span className="group-hover:underline underline-offset-4 decoration-portfolio-line">
                          {achievement.title}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          size={14}
                          className="ml-1 inline-block -translate-y-[1px] text-portfolio-muted/70 transition-transform duration-150 group-hover:text-portfolio-ink group-hover:translate-x-0.5 group-hover:-translate-y-1"
                        />
                      </a>
                    ) : (
                      achievement.title
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
