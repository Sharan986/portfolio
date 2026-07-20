import Splash from '@/components/layout/Splash';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TechStackMarquee from '@/components/sections/TechStackMarquee';
import AppDevSection from '@/components/sections/AppDevSection';
import TimelineSection from '@/components/sections/TimelineSection';
import ColorBendsWrapper from '@/components/layout/ColorBendsWrapper';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="w-full bg-[#0C0C0C] min-h-screen">
      <Splash />
      <Navigation />
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <TechStackMarquee />

      {/* Color Bends ambient background wraps AppDev + Timeline + Contact */}
      <ColorBendsWrapper>
        <AppDevSection />
        <TimelineSection />
        <ContactSection />
      </ColorBendsWrapper>

      {/* Footer */}
      <footer className="w-full bg-[#0C0C0C] text-[#D7E2EA] py-12 border-t border-[#D7E2EA]/10 text-center relative z-40">
        <p className="text-[#D7E2EA]/50 text-sm font-kanit font-light tracking-wide">
          © {new Date().getFullYear()} Gursharan Singh. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
