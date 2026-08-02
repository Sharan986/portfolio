'use client';

import React from 'react';

const stack = ['React.js', 'JavaScript', 'SEO'];

export default function OneRepMaaxApp() {
  return (
    <div className="px-5 py-4 flex flex-col gap-4" style={{ color: '#D7E2EA' }}>
      {/* Header */}
      <div>
        <h2 className="font-kanit font-bold text-base leading-tight text-white">OneRepMaax</h2>
        <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/30 font-kanit">Frontend · SEO</span>
      </div>

      {/* Stat */}
      <div className="rounded-lg p-3.5 bg-[#111113] border border-white/[0.06]">
        <p className="font-kanit font-bold text-2xl text-white leading-none">17.7k</p>
        <p className="text-[11px] text-[#D7E2EA]/40 mt-1 uppercase tracking-wider font-kanit">Organic impressions in 6 months</p>
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#D7E2EA]/50 leading-relaxed font-kanit font-light">
        Production fitness platform with responsive UI and SEO-optimized frontend.
        Managed end-to-end from development through deployment and ongoing maintenance.
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
        href="https://www.onerepmaaxgym.in"
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
