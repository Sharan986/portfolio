'use client';

import React from 'react';

interface AndroidNavProps {
  onBack: () => void;
  onHome: () => void;
  onRecents: () => void;
}

export default function AndroidNav({ onBack, onHome, onRecents }: AndroidNavProps) {
  return (
    <div
      className="absolute bottom-0 inset-x-0 h-11 flex items-center justify-around z-[60] px-8 border-t border-white/[0.04] bg-black/40 backdrop-blur-md"
    >
      {/* Back Button — sleek rounded triangle */}
      <button 
        onClick={onBack}
        className="w-10 h-10 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-200 cursor-none"
        aria-label="Back"
        data-interactive
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path 
            d="M15 19l-7-7 7-7" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-[#D7E2EA]"
          />
        </svg>
      </button>

      {/* Home Button — clean circle with inner dot */}
      <button 
        onClick={onHome}
        className="w-10 h-10 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-200 cursor-none"
        aria-label="Home"
        data-interactive
      >
        <div className="relative w-[18px] h-[18px]">
          <div className="absolute inset-0 rounded-full border-[1.5px] border-[#D7E2EA]" />
          <div className="absolute inset-[5px] rounded-full bg-[#D7E2EA]/30" />
        </div>
      </button>

      {/* Recents Button — stacked rounded squares */}
      <button 
        onClick={onRecents}
        className="w-10 h-10 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-200 cursor-none"
        aria-label="Recent Apps"
        data-interactive
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect 
            x="4" y="4" 
            width="16" height="16" 
            rx="3.5" 
            stroke="currentColor" 
            strokeWidth="1.5"
            className="text-[#D7E2EA]"
          />
        </svg>
      </button>
    </div>
  );
}
