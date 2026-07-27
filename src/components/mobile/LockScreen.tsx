'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useOSStore } from '@/stores/os-store';
import { useOSClock } from './useOSClock';

export default function LockScreen() {
  const unlock = useOSStore((s) => s.unlock);
  const hasBooted = useOSStore((s) => s.hasBooted);
  const reduced = useReducedMotion();
  // Skip logo/progress phases if already booted this session
  const [bootPhase, setBootPhase] = useState<'logo' | 'progress' | 'lock'>(hasBooted ? 'lock' : 'logo');
  const [unlocking, setUnlocking] = useState(false);
  const dragStartY = useRef<number | null>(null);

  // Boot sequence — only runs if not already booted
  useEffect(() => {
    if (hasBooted) return; // Skip boot animation
    const t1 = setTimeout(() => setBootPhase('progress'), 800);
    const t2 = setTimeout(() => setBootPhase('lock'), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [hasBooted]);

  // Auto-unlock after 3s on lock screen if not already unlocking
  useEffect(() => {
    if (bootPhase === 'lock' && !unlocking) {
      const t = setTimeout(() => {
        setUnlocking(true);
        setTimeout(() => unlock(), 600);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [bootPhase, unlocking, unlock]);

  const { time, dateLong: date } = useOSClock();

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (dragStartY.current !== null) {
      const delta = dragStartY.current - e.clientY;
      if (delta > 50) {
        setUnlocking(true);
        setTimeout(() => unlock(), 600);
      }
    }
    dragStartY.current = null;
  }, [unlock]);

  return (
    <motion.div
      className="absolute inset-0 z-15 flex flex-col items-center justify-between
                 select-none touch-manipulation cursor-none overflow-hidden bg-black/40 backdrop-blur-md"
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? {} : { opacity: 0, y: '-15%' }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* ── Boot Phase: Logo ── */}
      <AnimatePresence>
        {(bootPhase === 'logo' || bootPhase === 'progress') && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#0A0A0F]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* G/OS Logo */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="font-kanit font-bold text-[28px] tracking-[0.15em] text-[#D7E2EA]/60">
                G/OS
              </span>
              <span className="font-inter text-[8px] text-[#D7E2EA]/15 tracking-[0.3em] uppercase mt-1">
                System v2.4
              </span>
            </motion.div>

            {/* Progress bar */}
            <AnimatePresence>
              {bootPhase === 'progress' && (
                <motion.div
                  className="mt-8 w-24 h-[2px] rounded-full overflow-hidden bg-[#D7E2EA]/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="h-full bg-[#D7E2EA]/30 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lock Phase ── */}
      <AnimatePresence>
        {bootPhase === 'lock' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-between z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Clock + Date — Nothing Phone style */}
            <div className="flex flex-col items-center pt-20">
              <motion.span
                className="font-kanit font-extralight text-[56px] text-[#D7E2EA]/80 tabular-nums leading-none tracking-tight"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {time}
              </motion.span>
              <motion.span
                className="font-inter font-normal text-[11px] text-[#D7E2EA]/25 tracking-[0.15em] mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {date}
              </motion.span>
            </div>

            {/* Notification card */}
            <motion.div
              className="w-full px-5 flex-1 flex flex-col justify-center max-w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div
                className="rounded-2xl p-3.5 flex items-start gap-3 border border-white/[0.08]"
                style={{
                  background: 'rgba(17,17,21,0.4)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.06]"
                  style={{
                    background: 'rgba(26,26,32,0.7)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[#73C5DE]/40">
                    <rect x="2" y="3" width="12" height="10" rx="1.5" />
                    <line x1="5" y1="7" x2="11" y2="7" />
                    <line x1="5" y1="10" x2="9" y2="10" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-inter font-medium text-[#D7E2EA]/50 leading-tight">Projects</p>
                  <p className="text-[10px] font-inter text-[#D7E2EA]/25 leading-tight mt-0.5">4 projects available to explore</p>
                </div>
                <span className="text-[9px] font-inter text-[#D7E2EA]/15 mt-0.5 shrink-0">now</span>
              </div>
            </motion.div>

            {/* Fingerprint + Unlock hint */}
            <div className="flex flex-col items-center pb-8 gap-3">
              {/* Fingerprint icon */}
              <motion.div
                className="relative"
                animate={unlocking ? { scale: 1.3, opacity: 0 } : {}}
                transition={{ duration: 0.4 }}
              >
                {/* Unlock ring */}
                <motion.div
                  className="absolute inset-[-6px] rounded-full border-2 border-[#73C5DE]/0"
                  animate={unlocking
                    ? { borderColor: 'rgba(115,197,222,0.4)', scale: 1.5, opacity: 0 }
                    : { borderColor: 'rgba(115,197,222,0)' }
                  }
                  transition={{ duration: 0.5 }}
                />
                <motion.svg
                  width="28" height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  className={unlocking ? 'text-[#73C5DE]/60' : 'text-[#D7E2EA]/20'}
                  animate={reduced ? {} : { opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path d="M12 10V14" />
                  <path d="M8.5 8.2A4.5 4.5 0 0 1 16.5 12v1" />
                  <path d="M7.5 12v1a4.5 4.5 0 0 0 4.5 4.5" />
                  <path d="M6 7A7 7 0 0 1 18 12.5" />
                  <path d="M6 12.5A7 7 0 0 0 12 19" />
                  <path d="M17 15a7 7 0 0 1-1 2" />
                </motion.svg>
              </motion.div>

              <motion.span
                className="text-[9px] text-[#D7E2EA]/12 tracking-[0.2em] uppercase font-inter"
                animate={unlocking ? { opacity: 0 } : {}}
              >
                Touch to unlock
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
