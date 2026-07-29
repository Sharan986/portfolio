'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useOSStore } from '@/stores/os-store';
import { useOSClock } from './useOSClock';

const QUICK_TOGGLES = [
  { label: 'Wi-Fi', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor"/>
    </svg>
  ), active: true },
  { label: 'BT', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7l10 10-5 5V2l5 5L7 17"/>
    </svg>
  ), active: true },
  { label: 'DND', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" /><line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ), active: false },
  { label: 'Light', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2v1"/><path d="M12 7a4 4 0 0 1 4 4c0 1.5-.8 3-2 4h-4c-1.2-1-2-2.5-2-4a4 4 0 0 1 4-4z"/>
    </svg>
  ), active: false },
];

export default function NotificationShade() {
  const { shadeOpen, closeShade } = useOSStore();
  const reduced = useReducedMotion();
  const { time, dateLong: date } = useOSClock();

  if (!shadeOpen) return null;

  return (
    <>
      {/* Backdrop — tap to dismiss */}
      <motion.div
        className="absolute inset-0 z-44 cursor-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeShade}
        data-interactive
      />

      {/* Shade panel */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-45 cursor-none select-none"
        initial={reduced ? {} : { y: '-100%' }}
        animate={{ y: 0 }}
        exit={reduced ? {} : { y: '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div
          className="px-4 pt-3 pb-4 border-b border-white/[0.06]"
          style={{
            background: 'rgba(10, 10, 15, 0.75)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            boxShadow: 'inset 0 -1px 0 0 rgba(255,255,255,0.03)',
          }}
        >
          {/* Time + Date */}
          <div className="flex flex-col items-start mb-4">
            <span className="font-kanit font-extralight text-[36px] text-[#D7E2EA]/65 tabular-nums leading-none tracking-tight">
              {time}
            </span>
            <span className="font-inter font-normal text-[11px] text-[#D7E2EA]/20 tracking-wider mt-1.5">
              {date}
            </span>
          </div>

          {/* Quick Toggles */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {QUICK_TOGGLES.map((toggle) => (
              <div
                key={toggle.label}
                className={`flex flex-col items-center gap-1 py-2 rounded-xl border transition-colors ${
                  toggle.active
                    ? 'border-[#73C5DE]/20 text-[#73C5DE]/60'
                    : 'border-white/[0.06] text-[#D7E2EA]/25'
                }`}
                style={{
                  background: toggle.active ? 'rgba(115,197,222,0.08)' : 'rgba(21,21,23,0.5)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                {toggle.icon}
                <span className="text-[7px] font-inter font-medium tracking-wider uppercase">{toggle.label}</span>
              </div>
            ))}
          </div>

          {/* Brightness Slider */}
          <div className="flex items-center gap-2.5 px-1 mb-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[#D7E2EA]/20 shrink-0">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <div className="flex-1 h-[3px] rounded-full bg-[#D7E2EA]/8 overflow-hidden">
              <div className="w-[65%] h-full rounded-full bg-[#D7E2EA]/25" />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.04] mb-3" />

          {/* Notification */}
          <div
            className="rounded-xl p-3 flex items-start gap-2.5 border border-white/[0.06]"
            style={{
              background: 'rgba(17,17,21,0.45)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-white/[0.06]"
              style={{
                background: 'rgba(26,26,32,0.6)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[#73C5DE]/40">
                <rect x="2" y="3" width="12" height="10" rx="1.5" />
                <line x1="5" y1="7" x2="11" y2="7" /><line x1="5" y1="10" x2="9" y2="10" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-inter font-medium text-[#D7E2EA]/45 leading-tight">Portfolio</p>
              <p className="text-[9px] font-inter text-[#D7E2EA]/20 leading-tight mt-0.5">Building something incredible...</p>
            </div>
            <span className="text-[8px] font-inter text-[#D7E2EA]/12 mt-0.5 shrink-0">2m ago</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
