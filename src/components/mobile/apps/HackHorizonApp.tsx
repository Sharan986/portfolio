'use client';

import React from 'react';

const stack = ['Next.js', 'TypeScript', 'MongoDB', 'Node.js'];

export default function HackHorizonApp() {
  return (
    <div className="px-5 py-4 flex flex-col gap-4" style={{ color: '#D7E2EA' }}>
      {/* Header */}
      <div>
        <h2 className="font-kanit font-bold text-base leading-tight text-white">HackHorizon</h2>
        <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/30 font-kanit">Full Stack Platform</span>
      </div>

      {/* Stat */}
      <div className="rounded-lg p-3.5 bg-[#111113] border border-white/[0.06]">
        <p className="font-kanit font-bold text-2xl text-white leading-none">800+</p>
        <p className="text-[11px] text-[#D7E2EA]/40 mt-1 uppercase tracking-wider font-kanit">Participants supported</p>
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#D7E2EA]/50 leading-relaxed font-kanit font-light">
        Official hackathon platform handling registrations, submissions, and
        participant workflows for 150+ teams. Built for high-concurrency traffic
        with automated organizer workflows.
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5">
        {stack.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-md text-[10px] font-kanit font-medium text-[#D7E2EA]/40
                                   border border-white/[0.06] bg-[#111113]">
            {t}
          </span>
        ))}
      </div>

      {/* Link */}
      <a
        href="https://hackhorizon.online"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
                   bg-[#151517] border border-white/[0.08] text-[#D7E2EA]/60 text-[13px] font-kanit font-medium
                   hover:border-[#73C5DE]/20 hover:text-[#D7E2EA]/80 transition-colors duration-150
                   touch-manipulation [-webkit-tap-highlight-color:transparent] cursor-none"
        data-interactive
      >
        View Live ↗
      </a>
    </div>
  );
}
