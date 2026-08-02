'use client';

import React from 'react';

const PROJECTS = [
  {
    name: 'HackHorizon',
    desc: 'Official hackathon platform for 800+ participants with automated workflows.',
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'Node.js'],
    href: 'https://hackhorizon.online',
    stat: '800+ participants',
  },
  {
    name: 'PROVN',
    desc: 'AI-powered networking platform with chatbot workflows and automated responses.',
    stack: ['Next.js', 'JavaScript', 'AI APIs', 'Cloud'],
    href: 'https://ccs-cyan.vercel.app',
    stat: '250+ users at launch',
  },
  {
    name: 'OneRepMaax',
    desc: 'Production fitness platform with responsive UI and SEO-optimized frontend.',
    stack: ['React.js', 'JavaScript', 'SEO'],
    href: 'https://www.onerepmaaxgym.in',
    stat: '17.7k impressions',
  },
  {
    name: 'Collabase',
    desc: 'Collaborative platform with real-time dashboards and modular architecture.',
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'Firebase'],
    href: 'https://collabase.vercel.app',
    stat: 'Real-time collaboration',
  },
];

export default function ProjectsApp() {
  return (
    <div className="px-4 py-3 flex flex-col gap-1" style={{ color: '#D7E2EA' }}>
      {/* Header */}
      <div className="mb-2">
        <h2 className="font-kanit font-bold text-[15px] text-white leading-tight">Projects</h2>
        <p className="text-[10px] text-[#D7E2EA]/25 font-kanit mt-0.5">Explore the ecosystem</p>
      </div>

      {/* Search bar — decorative */}
      <div className="flex items-center gap-2 bg-[#111113] border border-white/[0.06] rounded-lg px-3 py-2 mb-2">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[#D7E2EA]/20 shrink-0">
          <circle cx="7" cy="7" r="4.5" /><line x1="10.5" y1="10.5" x2="14" y2="14" />
        </svg>
        <span className="text-[11px] font-kanit text-[#D7E2EA]/15">Search projects...</span>
      </div>

      {/* Project cards */}
      <div className="flex flex-col gap-2">
        {PROJECTS.map((p) => (
          <div key={p.name} className="bg-[#111113] border border-white/[0.06] rounded-lg p-3">
            {/* Name + stat */}
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="font-kanit font-semibold text-[13px] text-white/90">{p.name}</h3>
              <span className="text-[9px] font-kanit text-[#73C5DE]/40 uppercase tracking-wider">{p.stat}</span>
            </div>

            {/* Description */}
            <p className="text-[11px] text-[#D7E2EA]/35 font-kanit font-light leading-relaxed mb-2">
              {p.desc}
            </p>

            {/* Stack + link */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {p.stack.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md text-[9px] font-kanit font-medium text-[#D7E2EA]/30
                                           border border-white/[0.05] bg-[#0C0C0C]">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-kanit text-[#73C5DE]/50 hover:text-[#73C5DE]/80
                           transition-colors cursor-none shrink-0 ml-2"
                data-interactive
              >
                Open ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
