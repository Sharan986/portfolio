'use client';

import React from 'react';
import posthog from 'posthog-js';
import FadeIn from '@/components/ui/FadeIn';
import Magnet from '@/components/ui/Magnet';
import { FileText, ArrowUpRight } from 'lucide-react';
import { GitHubLight, LinkedIn } from 'developer-icons';
import Antigravity from '@/components/ui/Antigravity';
import { useResumeStore } from '@/store/useResumeStore';

export default function ContactSection() {
  const { openResume } = useResumeStore();
  return (
    <section
      id="contact"
      className="w-full py-24 md:py-32 px-6 md:px-10 relative z-40 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, transparent 0%, #0C0C0C 20%, #0C0C0C 100%)'
      }}
    >

      {/* ── 3D Antigravity Background (Hidden on small screens) ── */}
      <div
        className="hidden md:block absolute inset-0 z-0 opacity-80"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
        }}
      >
        <Antigravity
          count={250}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#D7E2EA"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-12 relative z-10 pointer-events-none">

        {/* Left Side: Big Text CTA */}
        <div className="max-w-2xl">
          <FadeIn y={20}>
            <p className="text-[#D7E2EA]/60 font-kanit font-light uppercase tracking-widest text-sm md:text-base mb-6">
              Got an idea?
            </p>
          </FadeIn>
          <FadeIn y={20} delay={0.1}>
            <h2 className="hero-heading font-kanit font-black uppercase tracking-wide leading-[0.9] text-[12vw] sm:text-[10vw] md:text-7xl lg:text-8xl m-0">
              LET&apos;S BUILD
              <br />
              <span
                style={{
                  WebkitTextStroke: '1.5px rgba(215,226,234,0.25)',
                  color: 'transparent',
                }}
              >TOGETHER.</span>
            </h2>
          </FadeIn>

          <FadeIn y={20} delay={0.2} className="mt-10 md:mt-12">
            <Magnet padding={50} strength={1.5} className="inline-block">
              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault();
                  posthog.capture('clicked_resume', { location: 'contact_section' });
                  openResume();
                }}
                className="group relative inline-flex items-center gap-3 rounded-full font-inter font-medium tracking-[0.2em] uppercase text-[#D7E2EA] px-8 py-4 text-xs overflow-hidden transition-all duration-300 transform-gpu hover:scale-105 pointer-events-auto"
                style={{
                  background: 'rgba(215,226,234,0.03)',
                  boxShadow: 'inset 0 0 0 1px rgba(215,226,234,0.2), 0 4px 12px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <FileText size={14} />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Resume</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <path d="M1 13L13 1M13 1H4M13 1V10" />
                </svg>
                <div className="absolute inset-0 z-0 bg-[#D7E2EA]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </a>
            </Magnet>
          </FadeIn>
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-col w-full md:w-auto">
          <FadeIn y={20} delay={0.3}>
            <p className="text-[#D7E2EA]/50 font-kanit font-light uppercase tracking-widest text-sm mb-4 md:text-right">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              <SocialLink
                href="https://github.com/Sharan986"
                icon={<GitHubLight size={20} />}
                label="Github"
              />
              <SocialLink
                href="https://linkedin.com/in/gur-sharansingh"
                icon={<LinkedIn size={20} />}
                label="LinkedIn"
              />
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Magnet padding={30} strength={2}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-12 md:gap-16 px-6 py-5 rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/10 transition-colors w-full md:min-w-[280px] pointer-events-auto"
      >
        <div className="flex items-center gap-4 text-[#D7E2EA]">
          {icon}
          <span className="font-kanit font-medium tracking-wide text-lg">{label}</span>
        </div>
        <ArrowUpRight size={20} className="text-[#D7E2EA]/40 group-hover:text-[#D7E2EA] transition-colors" />
      </a>
    </Magnet>
  );
}
