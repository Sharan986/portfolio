'use client';

import React, { Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { APPS } from './apps';
import AppLoadingScreen from './AppLoadingScreen';
import StatusBar from './StatusBar';
import { useOSStore } from '@/stores/os-store';

interface AppViewProps {
  appId: string;
  onClose: () => void;
}

export default function AppView({ appId, onClose }: AppViewProps) {
  const { setTransitioning } = useOSStore();
  const reduced = useReducedMotion();
  const entry = APPS[appId];

  if (!entry) return null;

  const ActiveComponent = entry.component;

  return (
    <motion.div
      className="absolute inset-0 z-20 overflow-hidden will-change-transform transform-gpu"
      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      transition={reduced
        ? { duration: 0.15 }
        : { type: 'spring', stiffness: 400, damping: 35, mass: 0.8 }
      }
      onAnimationComplete={() => setTransitioning(false)}
    >
      {/* Static blur background — not animated, so GPU doesn't re-composite blur each frame */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Status bar */}
      <StatusBar onTap={() => useOSStore.getState().toggleShade()} />

      {/* Back button — minimal, left side */}
      <button
        onClick={onClose}
        className="absolute top-2.5 left-3 z-40 w-7 h-7 flex items-center justify-center
                   text-[#D7E2EA]/20 hover:text-[#D7E2EA]/45 transition-colors duration-150
                   touch-manipulation [-webkit-tap-highlight-color:transparent] cursor-none"
        aria-label="Back"
        data-interactive
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9,2 4,7 9,12" />
        </svg>
      </button>

      {/* Scrollable app content */}
      <div className="absolute inset-0 pt-10 pb-12 overflow-y-auto overscroll-contain">
        <Suspense fallback={<AppLoadingScreen appId={appId} />}>
          <ActiveComponent />
        </Suspense>
      </div>
    </motion.div>
  );
}

