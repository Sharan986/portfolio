'use client';

import React from 'react';

/* Glyph map covering all apps */
const GLYPHS: Record<string, React.ReactNode> = {
  projects: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1" /><rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" /><rect x="11" y="11" width="6" height="6" rx="1" />
    </svg>
  ),
  files: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4C3 3.45 3.45 3 4 3H8L10 5H16C16.55 5 17 5.45 17 6V15C17 15.55 16.55 16 16 16H4C3.45 16 3 15.55 3 15V4Z" />
    </svg>
  ),
  gallery: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <circle cx="7" cy="7" r="1.5" /><polyline points="17,13 13,9 5,17" />
    </svg>
  ),
  hackhorizon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <polyline points="4,14 8,6 12,11 16,4" /><line x1="4" y1="16" x2="16" y2="16" />
    </svg>
  ),
  provn: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="10" cy="7" r="3" /><circle cx="5" cy="15" r="2" /><circle cx="15" cy="15" r="2" />
      <line x1="10" y1="10" x2="5" y2="13" /><line x1="10" y1="10" x2="15" y2="13" />
    </svg>
  ),
  collabase: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="9" y="9" width="8" height="8" rx="1.5" />
    </svg>
  ),
  onerepmaax: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="5" y1="16" x2="5" y2="11" /><line x1="9" y1="16" x2="9" y2="8" />
      <line x1="13" y1="16" x2="13" y2="5" /><line x1="17" y1="16" x2="17" y2="3" />
    </svg>
  ),
};

export default function AppLoadingScreen({ appId }: { appId: string }) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center"
      style={{ background: '#0C0C0C' }}
    >
      <div
        className="w-12 h-12 rounded-lg bg-[#151517] border border-white/[0.06]
                    flex items-center justify-center text-[#D7E2EA]/40 animate-pulse"
      >
        {GLYPHS[appId] ?? <span className="text-xs font-kanit font-semibold">…</span>}
      </div>
    </div>
  );
}
