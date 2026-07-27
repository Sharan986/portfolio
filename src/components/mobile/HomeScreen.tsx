'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { APP_LIST } from './apps';
import { useOSStore } from '@/stores/os-store';
import { useOSClock } from './useOSClock';

/* ── Dot Matrix Font — 5×7 grid per character ── */
const DOT_FONT: Record<string, number[]> = {
  '0': [0x0E,0x11,0x13,0x15,0x19,0x11,0x0E],
  '1': [0x04,0x0C,0x04,0x04,0x04,0x04,0x0E],
  '2': [0x0E,0x11,0x01,0x02,0x04,0x08,0x1F],
  '3': [0x0E,0x11,0x01,0x06,0x01,0x11,0x0E],
  '4': [0x02,0x06,0x0A,0x12,0x1F,0x02,0x02],
  '5': [0x1F,0x10,0x1E,0x01,0x01,0x11,0x0E],
  '6': [0x06,0x08,0x10,0x1E,0x11,0x11,0x0E],
  '7': [0x1F,0x01,0x02,0x04,0x08,0x08,0x08],
  '8': [0x0E,0x11,0x11,0x0E,0x11,0x11,0x0E],
  '9': [0x0E,0x11,0x11,0x0F,0x01,0x02,0x0C],
  ':': [0x00,0x00,0x04,0x00,0x04,0x00,0x00],
};

function DotMatrixChar({ char, dotSize = 3, gap = 1.5, litColor = 'rgba(215,226,234,0.85)', dimColor = 'rgba(215,226,234,0.06)' }: {
  char: string; dotSize?: number; gap?: number; litColor?: string; dimColor?: string;
}) {
  const pattern = DOT_FONT[char];
  if (!pattern) return null;
  const cols = char === ':' ? 3 : 5;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`, gap: `${gap}px` }}>
      {pattern.map((row, r) =>
        Array.from({ length: cols }, (_, c) => {
          const bit = char === ':'
            ? (row >> (2 - c)) & 1
            : (row >> (4 - c)) & 1;
          return (
            <div
              key={`${r}-${c}`}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                backgroundColor: bit ? litColor : dimColor,
              }}
            />
          );
        })
      )}
    </div>
  );
}

function DotMatrixText({ text, dotSize = 3, gap = 1.5, charGap = 4, litColor, dimColor }: {
  text: string; dotSize?: number; gap?: number; charGap?: number; litColor?: string; dimColor?: string;
}) {
  return (
    <div style={{ display: 'flex', gap: `${charGap}px`, alignItems: 'center' }}>
      {text.split('').map((ch, i) => (
        <DotMatrixChar key={i} char={ch} dotSize={dotSize} gap={gap} litColor={litColor} dimColor={dimColor} />
      ))}
    </div>
  );
}

/* ── Nothing-style glyph patterns (decorative dot art) ── */
const GLYPH_PATTERN = [
  [0,0,1,1,1,1,0,0],
  [0,1,0,0,0,0,1,0],
  [1,0,0,1,1,0,0,1],
  [1,0,1,0,0,1,0,1],
  [1,0,1,0,0,1,0,1],
  [1,0,0,1,1,0,0,1],
  [0,1,0,0,0,0,1,0],
  [0,0,1,1,1,1,0,0],
];

function DotGlyph({ size = 4, gap = 2.5 }: { size?: number; gap?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(8, ${size}px)`, gap: `${gap}px` }}>
      {GLYPH_PATTERN.flat().map((bit, i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: bit ? 'rgba(215,226,234,0.5)' : 'rgba(215,226,234,0.04)',
          }}
        />
      ))}
    </div>
  );
}

/* ── App Icons — Nothing OS circular style ── */
const APP_ICONS: Record<string, { icon: React.ReactNode; accent: string }> = {
  projects: {
    accent: '#73C5DE',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" />
        <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" />
        <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" />
        <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" />
      </svg>
    ),
  },
  files: {
    accent: '#D4A853',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z" stroke="currentColor" />
        <line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" />
      </svg>
    ),
  },
  gallery: {
    accent: '#C577B5',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" />
        <circle cx="8.5" cy="8.5" r="2" stroke="currentColor" />
        <path d="M21 15l-5-5L5 21" stroke="currentColor" />
      </svg>
    ),
  },
};

interface HomeScreenProps {
  onOpenApp: (id: string) => void;
  activeApp: string | null;
}

export default function HomeScreen({ onOpenApp, activeApp }: HomeScreenProps) {
  const isTransitioning = useOSStore((s) => s.isTransitioning);
  const reduced = useReducedMotion();
  const { time, dateShort } = useOSClock();

  // Parse date parts
  const now = new Date();
  const dayNum = now.getDate();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const monthName = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  return (
    <div className="absolute inset-0 z-10 flex flex-col transform-gpu">
      {/* Dark glass background */}
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-md" />

      {/* ── Widget Grid — Nothing OS inspired ── */}
      <div className="relative z-10 px-3 mt-14 flex flex-col gap-2.5">

        {/* Row 1: Clock (dot matrix) + Date widget */}
        <div className="grid grid-cols-5 gap-2.5">
          {/* Dot Matrix Clock — 3 cols */}
          <div
            className="col-span-3 rounded-[20px] p-4 flex flex-col justify-between border border-white/[0.06]"
            style={{
              background: 'rgba(8,8,12,0.7)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
              minHeight: 90,
            }}
          >
            <span className="text-[7px] font-inter font-medium text-[#D7E2EA]/15 uppercase tracking-[0.2em]">
              Clock
            </span>
            <div className="flex items-center justify-center mt-1">
              <DotMatrixText text={time || '00:00'} dotSize={3.5} gap={1.5} charGap={5} />
            </div>
            <span className="text-[8px] font-inter text-[#D7E2EA]/15 tracking-wider mt-2 text-center">
              {dateShort || 'IST'}
            </span>
          </div>

          {/* Date Widget — 2 cols, bold number */}
          <div
            className="col-span-2 rounded-[20px] p-3.5 flex flex-col items-center justify-center border border-white/[0.06]"
            style={{
              background: 'rgba(215,226,234,0.06)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
              minHeight: 90,
            }}
          >
            <span className="font-kanit font-bold text-[40px] text-[#D7E2EA]/70 leading-none tabular-nums">
              {dayNum}
            </span>
            <span className="text-[9px] font-inter font-medium text-[#D7E2EA]/25 tracking-[0.2em] mt-1">
              {dayName}
            </span>
            <span className="text-[7px] font-inter text-[#D7E2EA]/12 tracking-[0.15em]">
              {monthName}
            </span>
          </div>
        </div>

        {/* Row 2: Dot Glyph Art + System Status */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Decorative Dot Glyph Widget — Nothing Phone style */}
          <div
            className="rounded-[20px] p-4 flex items-center justify-center border border-white/[0.06]"
            style={{
              background: 'rgba(8,8,12,0.7)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
              minHeight: 80,
            }}
          >
            <DotGlyph size={5} gap={3} />
          </div>

          {/* System / Build Status */}
          <div
            className="rounded-[20px] p-3.5 flex flex-col justify-between border border-white/[0.06]"
            style={{
              background: 'rgba(215,226,234,0.04)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
              minHeight: 80,
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
              <span className="text-[7px] text-[#D7E2EA]/25 uppercase tracking-[0.2em] font-inter font-medium">
                System
              </span>
            </div>
            <div className="mt-auto">
              <DotMatrixText
                text="75"
                dotSize={2.5}
                gap={1}
                charGap={3}
                litColor="rgba(115,197,222,0.7)"
                dimColor="rgba(115,197,222,0.06)"
              />
              <span className="text-[7px] font-inter text-[#D7E2EA]/15 tracking-wider mt-1 block">
                Battery • Online
              </span>
            </div>
          </div>
        </div>

        {/* Row 3: Now Building — full width slim widget */}
        <div
          className="rounded-[20px] px-4 py-3 flex items-center justify-between border border-white/[0.06]"
          style={{
            background: 'rgba(215,226,234,0.03)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(115,197,222,0.08)' }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#73C5DE]/50">
                <path d="M4 3l10 5-10 5V3z" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-inter font-medium text-[#D7E2EA]/45 leading-tight">
                Now Building
              </p>
              <p className="text-[8px] font-inter text-[#D7E2EA]/18 mt-0.5">
                Portfolio v2.4 • Gursharan
              </p>
            </div>
          </div>
          {/* Mini waveform — static dots (no animation for performance) */}
          <div className="flex items-end gap-[2px] h-4">
            {[0.3, 0.6, 0.4, 0.9, 0.5, 0.7, 0.3, 0.8].map((h, i) => (
              <div
                key={i}
                className="w-[2px] rounded-full bg-[#73C5DE]/20"
                style={{ height: `${h * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── App Icons — Nothing OS circular style ── */}
      <div className="relative z-10 flex items-center justify-center gap-6 mt-auto mb-16 px-4">
        {APP_LIST.map((app) => {
          const iconData = APP_ICONS[app.id];
          return (
            <button
              key={app.id}
              onClick={() => {
                if (!isTransitioning) onOpenApp(app.id);
              }}
              className="flex flex-col items-center gap-2 touch-manipulation
                         [-webkit-tap-highlight-color:transparent] cursor-none select-none group"
              disabled={isTransitioning}
              data-interactive
            >
              <motion.div
                className="w-[52px] h-[52px] rounded-full border border-white/[0.08]
                           flex items-center justify-center
                           group-hover:border-white/[0.18] transition-colors duration-200"
                style={{
                  background: 'rgba(215,226,234,0.06)',
                  color: iconData?.accent || '#D7E2EA80',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                }}
                whileTap={reduced ? {} : { scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {iconData?.icon ?? <span className="text-xs font-kanit font-semibold">{app.name[0]}</span>}
              </motion.div>
              <span className="text-[9px] text-[#D7E2EA]/30 font-inter font-medium tracking-wide text-center leading-tight">
                {app.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Discovery cue */}
      {!activeApp && (
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30
                      text-[#D7E2EA]/12 text-[8px] tracking-[0.25em] uppercase
                      whitespace-nowrap pointer-events-none select-none font-inter">
          Tap an app to explore
        </p>
      )}
    </div>
  );
}
