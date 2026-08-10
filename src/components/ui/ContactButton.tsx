'use client';

import React from 'react';
import posthog from 'posthog-js';
import { useResumeStore } from '@/store/useResumeStore';

export default function ContactButton() {
  const { openResume } = useResumeStore();
  return (
    <a 
      href="#resume"
      onClick={(e) => {
        e.preventDefault();
        posthog.capture('clicked_resume', { location: 'contact_button_component' });
        openResume();
      }}
      className="group relative inline-flex items-center justify-center rounded-full font-inter font-medium tracking-[0.2em] uppercase text-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-[10px] sm:text-[11px] md:text-xs overflow-hidden transition-all duration-300 transform-gpu hover:scale-105"
      style={{
        background: 'rgba(215,226,234,0.03)',
        boxShadow: 'inset 0 0 0 1px rgba(215,226,234,0.2), 0 4px 12px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-white">
        Resume
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 14 14" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="transition-transform duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          <path d="M1 13L13 1M13 1H4M13 1V10" />
        </svg>
      </span>
      {/* Subtle hover fill */}
      <div className="absolute inset-0 z-0 bg-[#D7E2EA]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
    </a>
  );
}
