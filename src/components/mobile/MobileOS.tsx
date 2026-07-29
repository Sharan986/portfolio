'use client';

import React, { useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useOSStore, type OSLayer } from '@/stores/os-store';
import HomeScreen from './HomeScreen';
import AppView from './AppView';
import StatusBar from './StatusBar';
import PhoneCursor from './PhoneCursor';
import LockScreen from './LockScreen';
import AndroidNav from './AndroidNav';
import NotificationShade from './NotificationShade';
import RecentApps from './RecentApps';

// MobileOS works in two contexts:
//   1. Portfolio homepage (/)  — uses ?mobile=<id> query param
//   2. Standalone /mobile routes — uses pathname /mobile/<id>
//
// "mode" prop tells us which context we're in.

interface MobileOSProps {
  mode: 'query' | 'path';
  pathAppId?: string | null;
  isFocused?: boolean;
}

export default function MobileOS({ mode, pathAppId, isFocused = true }: MobileOSProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cursorContainerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const {
    isTransitioning, setTransitioning,
    layer, setLayer,
    shadeOpen, closeShade,
    pushRecent,
  } = useOSStore();

  // Fix hydration mismatch: safely read sessionStorage after mount
  React.useEffect(() => {
    useOSStore.getState().initBootState();
  }, []);

  // Derive activeApp from URL
  const activeApp: string | null =
    mode === 'path'
      ? (pathAppId ?? null)
      : (searchParams.get('mobile'));

  // In path mode, skip sleep/lockscreen — always at least 'home'
  const effectiveLayer: OSLayer = mode === 'path'
    ? (layer === 'sleep' || layer === 'lockscreen' ? 'home' : layer)
    : layer;

  const showLockscreen = effectiveLayer === 'lockscreen';
  const showHome = effectiveLayer === 'home' || effectiveLayer === 'app';
  const showRecents = effectiveLayer === 'recents';
  const isSleep = effectiveLayer === 'sleep';

  // Sleep overlay opacity: 1 = fully dim, 0 = fully awake
  const sleepOpacity = isSleep ? 0.88 : showLockscreen ? 0.3 : 0;

  function openApp(id: string) {
    if (isTransitioning) return;
    closeShade();
    setTransitioning(true);
    pushRecent(id);
    setLayer('app');
    if (mode === 'path') {
      router.push(`/mobile/${id}`);
    } else {
      router.push(`/?mobile=${id}`, { scroll: false });
    }
  }

  function closeApp() {
    if (isTransitioning) return;
    setTransitioning(true);
    setLayer('home');
    if (mode === 'path') {
      router.push('/mobile');
    } else {
      router.push('/', { scroll: false });
    }
  }

  const handleRecentsClose = useCallback(() => {
    setLayer(activeApp ? 'app' : 'home');
  }, [setLayer, activeApp]);

  const handleNavHome = useCallback(() => {
    if (shadeOpen) closeShade();
    if (effectiveLayer === 'recents') {
      handleRecentsClose();
    }
    if (activeApp) {
      closeApp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeApp, isTransitioning, shadeOpen, effectiveLayer, handleRecentsClose]);

  const handleNavRecents = useCallback(() => {
    closeShade();
    setLayer('recents');
  }, [closeShade, setLayer]);

  const handleNavBack = useCallback(() => {
    if (shadeOpen) {
      closeShade();
      return;
    }
    if (effectiveLayer === 'recents') {
      handleRecentsClose();
      return;
    }
    if (activeApp) {
      closeApp();
    }
  }, [shadeOpen, closeShade, effectiveLayer, handleRecentsClose, activeApp, closeApp]);

  const handleRecentsOpenApp = useCallback((id: string) => {
    setLayer('app');
    openApp(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={cursorContainerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ contain: 'layout paint', cursor: 'none' }}
    >
      {/* ── Status Bar — hidden during sleep ── */}
      <AnimatePresence>
        {!isSleep && (
          <motion.div
            key="statusbar"
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? {} : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatusBar onTap={() => {
              const l = useOSStore.getState().layer;
              if (l !== 'sleep' && l !== 'lockscreen') {
                useOSStore.getState().toggleShade();
              }
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HomeScreen — always mounted beneath everything ── */}
      <HomeScreen onOpenApp={openApp} activeApp={activeApp} />

      {/* ── Sleep dimming overlay ── */}
      <motion.div
        className="absolute inset-0 z-12 pointer-events-none bg-black"
        animate={{ opacity: sleepOpacity }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      {/* ── LockScreen layer ── */}
      <AnimatePresence>
        {showLockscreen && (
          <LockScreen key="lockscreen" />
        )}
      </AnimatePresence>

      {/* ── App layer ── */}
      <AnimatePresence
        mode="wait"
        onExitComplete={() => setTransitioning(false)}
      >
        {activeApp && (
          <AppView
            key={activeApp}
            appId={activeApp}
            onClose={closeApp}
          />
        )}
      </AnimatePresence>

      {/* ── Recent Apps overlay ── */}
      <AnimatePresence>
        {showRecents && (
          <RecentApps
            key="recents"
            onOpenApp={handleRecentsOpenApp}
            onClose={handleRecentsClose}
          />
        )}
      </AnimatePresence>

      {/* ── Notification Shade ── */}
      <AnimatePresence>
        {shadeOpen && <NotificationShade key="shade" />}
      </AnimatePresence>

      {/* ── Android Navigation ── */}
      {!isSleep && !showLockscreen && (
        <AndroidNav
          onBack={handleNavBack}
          onHome={handleNavHome}
          onRecents={handleNavRecents}
        />
      )}

      {/* ── Custom cursor ── */}
      <PhoneCursor containerRef={cursorContainerRef} active={isFocused} />
    </div>
  );
}
