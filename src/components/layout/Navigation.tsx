'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import posthog from 'posthog-js';
import { useResumeStore } from '@/store/useResumeStore';

export default function Navigation() {
  const { openResume } = useResumeStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuPanelRef.current &&
        !menuPanelRef.current.contains(target) &&
        burgerRef.current &&
        !burgerRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {/* BURGER */}
      <div className="fixed top-[16px] md:top-[27px] right-0 w-1/2 z-50 flex justify-end items-center">
        <div className="pr-[20px] md:pr-[40px]">
          <button
            ref={burgerRef}
            className={`burger-btn w-[59px] h-[59px] rounded-full border-none cursor-pointer flex flex-col gap-1 items-center justify-center transition-colors duration-400 ease-in-out ${menuOpen ? 'open bg-[#1A1A1A]' : 'bg-white/10 hover:bg-[#1A1A1A] backdrop-blur-sm group'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`bar block w-[24px] h-[2px] transition-all duration-300 ease-in-out bg-[#D7E2EA]`}></span>
            <span className={`bar block w-[24px] h-[2px] transition-all duration-300 ease-in-out bg-[#D7E2EA]`}></span>
          </button>
        </div>
      </div>

      {/* MENU PANEL */}
      <div ref={menuPanelRef} className={`menu-panel fixed left-2 right-2 md:left-auto md:right-[7px] md:w-[420px] rounded-[20px] bg-black/95 backdrop-blur-[26px] p-[90px_32px_32px_32px] md:p-[60px] flex flex-col justify-between z-40 ${menuOpen ? 'open' : ''}`}>
        <nav className="flex flex-col gap-2">
          <Link href="#work" className="text-[#F4F1E8] text-[36px] md:text-[42px] font-medium no-underline leading-[130%] transition-opacity duration-300 hover:opacity-70" onClick={() => setMenuOpen(false)}>Work</Link>
          <Link href="#about" className="text-[#F4F1E8] text-[36px] md:text-[42px] font-medium no-underline leading-[130%] transition-opacity duration-300 hover:opacity-70" onClick={() => setMenuOpen(false)}>About</Link>
        </nav>
        <div className="flex flex-col gap-5 mt-8">
          <a href="mailto:hello@gursharansingh.me" className="text-[#9A9590] text-[18px] md:text-[20px] no-underline transition-colors duration-300 hover:text-[#F4F1E8]">hello@gursharansingh.me</a>
          <div className="flex gap-6">
            <a href="https://github.com/Sharan986" target="_blank" rel="noreferrer" className="text-[#9A9590] text-[14px] underline underline-offset-2 transition-colors duration-300 hover:text-[#F4F1E8]">GitHub</a>
            <a href="https://linkedin.com/in/gur-sharansingh" target="_blank" rel="noreferrer" className="text-[#9A9590] text-[14px] underline underline-offset-2 transition-colors duration-300 hover:text-[#F4F1E8]">LinkedIn</a>
          </div>
        </div>
        <div className="mt-8">
          <a 
            href="#resume" 
            onClick={(e) => {
              e.preventDefault();
              posthog.capture('clicked_resume', { location: 'navigation' });
              openResume();
              setMenuOpen(false);
            }}
            className="menu-cta-btn relative overflow-hidden flex items-center border-none bg-transparent cursor-pointer rounded-full p-1.5 gap-2 group inline-flex decoration-none no-underline"
          >
            <span className="menu-cta-bg absolute top-[5px] bottom-[5px] left-[8px] w-[calc(100%-8px-8px-38px-8px)] group-hover:w-[calc(100%-12px)] rounded-full bg-white/10 z-0 transition-[width] duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></span>
            <span className="menu-cta-text relative z-10 text-[#D7E2EA] font-medium text-[14px] py-2 px-10 whitespace-nowrap">Resume</span>
            <span className="menu-cta-circle relative z-10 flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#D7E2EA] shrink-0 transition-transform duration-300 group-hover:-translate-x-1">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="#0C0C0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
