import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import ExperienceSection from "./components/ExperienceSection";
import Navigation from "./components/Navigation";
import ProfileCard from "./components/ProfileCard";
import SectionReveal from "./components/SectionReveal";
import WorkSection from "./components/WorkSection";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col md:flex-row">
      <header className="sticky top-0 z-50 border-b border-portfolio-line bg-portfolio-bg/92 px-4 py-3 backdrop-blur md:hidden">
        <Navigation variant="mobile" />
      </header>

      <aside className="hidden w-[360px] shrink-0 px-8 py-8 md:block lg:w-[420px] lg:px-12">
        <div className="sticky top-8">
          <ProfileCard />
        </div>
      </aside>

      <main className="w-full min-w-0 px-4 pb-16 md:px-8 md:py-8 lg:px-12">
        <SectionReveal>
          <AboutSection />
        </SectionReveal>

        <SectionReveal>
          <WorkSection />
        </SectionReveal>

        <SectionReveal>
          <ExperienceSection />
        </SectionReveal>

        <SectionReveal>
          <ContactSection />
        </SectionReveal>
      </main>
    </div>
  );
}
