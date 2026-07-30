'use client';

import React, { useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useOSStore } from '@/stores/os-store';
import { APPS } from './apps';

/* ── Reuse glyph map for card thumbnails ── */
const GLYPHS: Record<string, React.ReactNode> = {
  hackhorizon: (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[#D7E2EA]/25">
      <polyline points="4,14 8,6 12,11 16,4" /><line x1="4" y1="16" x2="16" y2="16" />
    </svg>
  ),
  provn: (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[#D7E2EA]/25">
      <circle cx="10" cy="7" r="3" /><circle cx="5" cy="15" r="2" /><circle cx="15" cy="15" r="2" />
      <line x1="10" y1="10" x2="5" y2="13" /><line x1="10" y1="10" x2="15" y2="13" />
    </svg>
  ),
  collabase: (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7E2EA]/25">
      <rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="9" y="9" width="8" height="8" rx="1.5" />
    </svg>
  ),
  onerepmaax: (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[#D7E2EA]/25">
      <line x1="5" y1="16" x2="5" y2="11" /><line x1="9" y1="16" x2="9" y2="8" />
      <line x1="13" y1="16" x2="13" y2="5" /><line x1="17" y1="16" x2="17" y2="3" />
    </svg>
  ),
  projects: (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7E2EA]/25">
      <rect x="3" y="3" width="6" height="6" rx="1" /><rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" /><rect x="11" y="11" width="6" height="6" rx="1" />
    </svg>
  ),
  files: (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7E2EA]/25">
      <path d="M3 4C3 3.45 3.45 3 4 3H8L10 5H16C16.55 5 17 5.45 17 6V15C17 15.55 16.55 16 16 16H4C3.45 16 3 15.55 3 15V4Z" />
    </svg>
  ),
  gallery: (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7E2EA]/25">
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <circle cx="7" cy="7" r="1.5" /><polyline points="17,13 13,9 5,17" />
    </svg>
  ),
};

interface RecentAppsProps {
  onOpenApp: (id: string) => void;
  onClose: () => void;
}

export default function RecentApps({ onOpenApp, onClose }: RecentAppsProps) {
  const { recentApps, removeRecent, clearRecents } = useOSStore();
  const reduced = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const swipeStartY = useRef<Record<string, number>>({});

  const handleCardSwipeDown = useCallback((id: string, e: React.PointerEvent) => {
    swipeStartY.current[id] = e.clientY;
  }, []);

  const handleCardSwipeUp = useCallback((id: string, e: React.PointerEvent) => {
    const start = swipeStartY.current[id];
    if (start !== undefined) {
      const delta = start - e.clientY;
      if (delta > 40) {
        removeRecent(id);
      }
      delete swipeStartY.current[id];
    }
  }, [removeRecent]);

  return (
    <motion.div
      className="absolute inset-0 z-25 flex flex-col cursor-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
        onClick={onClose}
        data-interactive
      />

      {/* Label */}
      <div className="relative z-10 pt-14 px-5 flex items-center justify-between">
        <span className="text-[10px] font-kanit font-medium text-[#D7E2EA]/25 uppercase tracking-widest">
          Recent
        </span>
        {recentApps.length > 0 && (
          <button
            onClick={() => { clearRecents(); onClose(); }}
            className="text-[10px] font-kanit text-[#D7E2EA]/20 hover:text-[#73C5DE]/50 transition-colors cursor-none"
            data-interactive
          >
            Clear all
          </button>
        )}
      </div>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 flex items-center gap-3 px-5 overflow-x-auto
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <AnimatePresence>
          {recentApps.length === 0 ? (
            <motion.p
              key="empty"
              className="text-[11px] font-kanit text-[#D7E2EA]/15 w-full text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No recent apps
            </motion.p>
          ) : (
            recentApps.map((id, i) => {
              const entry = APPS[id];
              if (!entry) return null;
              return (
                <motion.div
                  key={id}
                  className="shrink-0 w-[70%] h-[55%] rounded-xl border border-white/[0.08]
                             flex flex-col overflow-hidden cursor-none"
                  style={{
                    background: 'rgba(17,17,21,0.5)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.3)',
                  }}
                  initial={reduced ? {} : { scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={reduced ? {} : { scale: 0.85, opacity: 0, y: -30 }}
                  transition={{ delay: i * 0.03, type: 'spring', stiffness: 350, damping: 30 }}
                  onClick={() => onOpenApp(id)}
                  onPointerDown={(e) => handleCardSwipeDown(id, e)}
                  onPointerUp={(e) => handleCardSwipeUp(id, e)}
                  data-interactive
                >
                  {/* Card header */}
                  <div className="flex items-center gap-2 px-3 pt-2.5 pb-2 border-b border-white/[0.04]">
                    <div className="w-5 h-5 rounded bg-[#151517] flex items-center justify-center">
                      {GLYPHS[id] ? (
                        <div className="scale-50">{GLYPHS[id]}</div>
                      ) : (
                        <span className="text-[8px] font-kanit text-[#D7E2EA]/25">{entry.name[0]}</span>
                      )}
                    </div>
                    <span className="text-[10px] font-kanit font-medium text-[#D7E2EA]/40">{entry.name}</span>
                  </div>
                  {/* Card body — matte placeholder */}
                  <div className="flex-1 flex items-center justify-center">
                    {GLYPHS[id] ?? <span className="text-[#D7E2EA]/10 font-kanit text-sm">{entry.name[0]}</span>}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
