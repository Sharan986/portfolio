'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Android } from '@/components/ui/android';
import MobileOS from '@/components/mobile/MobileOS';
import { useOSStore } from '@/stores/os-store';
import { useCursorStore } from '@/stores/cursor-store';
import { cn } from '@/lib/utils';

export default function AppDevSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const hasUnlockedRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const lastToggleRef = useRef(0);

  // Debounced toggle — ignores clicks within 600ms of the last toggle
  const handleToggle = (next: boolean) => {
    const now = Date.now();
    if (now - lastToggleRef.current < 600) return;
    lastToggleRef.current = now;
    setIsExpanded(next);
  };
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [isScreenHovered, setIsScreenHovered] = useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);

  const { setCursor, resetCursor } = useCursorStore();

  const rafRef = useRef<number>(0);
  const scrollRafRef = useRef<number>(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const rectsRef = useRef({
    section: { left: 0, right: 0, top: 0, bottom: 0 },
    screen: { left: 0, right: 0, top: 0, bottom: 0 },
    phone: { left: 0, right: 0, top: 0, bottom: 0 }
  });

  useEffect(() => {
    const updateRects = () => {
      if (sectionRef.current) rectsRef.current.section = sectionRef.current.getBoundingClientRect();
      if (screenRef.current) rectsRef.current.screen = screenRef.current.getBoundingClientRect();
      if (phoneRef.current) rectsRef.current.phone = phoneRef.current.getBoundingClientRect();
    };

    updateRects();
    window.addEventListener('resize', updateRects, { passive: true });
    window.addEventListener('scroll', updateRects, { passive: true });

    return () => {
      window.removeEventListener('resize', updateRects);
      window.removeEventListener('scroll', updateRects);
    };
  }, [isExpanded]); // Update rects when expanded state changes

  useEffect(() => {
    const updateHoverState = () => {
      let sectionInBounds = false;
      let screenInBounds = false;
      let phoneInBounds = false;
      const { section, screen, phone } = rectsRef.current;
      const { x, y } = lastMousePos.current;

      sectionInBounds = x >= section.left && x <= section.right && y >= section.top && y <= section.bottom;
      screenInBounds = x >= screen.left && x <= screen.right && y >= screen.top && y <= screen.bottom;
      phoneInBounds = x >= phone.left && x <= phone.right && y >= phone.top && y <= phone.bottom;

      setIsSectionHovered(sectionInBounds);
      setIsScreenHovered(screenInBounds);
      setIsPhoneHovered(phoneInBounds);
    };

    const handleGlobalMove = (e: MouseEvent) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      updateHoverState();

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        // We only use this for triggering state updates now
      });
    };

    const handleScroll = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = 0;
        updateHoverState();
      });
    };

    window.addEventListener('mousemove', handleGlobalMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;

    const store = useOSStore.getState();

    // If already booted this session, skip the sleep/wake dance entirely
    if (store.hasBooted) {
      hasUnlockedRef.current = true;
      if (store.layer === 'sleep' || store.layer === 'lockscreen') {
        store.setLayer('home');
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const ratio = entry.intersectionRatio;
        const currentStore = useOSStore.getState();

        // Once at home/app, never re-trigger boot
        if (currentStore.layer === 'home' || currentStore.layer === 'app') {
          hasUnlockedRef.current = true;
        }
        if (hasUnlockedRef.current) return;

        if (ratio < 0.15) {
          // Barely visible → sleep
          if (currentStore.layer !== 'sleep') currentStore.setLayer('sleep');
        } else if (ratio < 0.4) {
          // Partially visible → lockscreen (triggers boot animation)
          if (currentStore.layer === 'sleep') currentStore.wake();
        }
        // Beyond 0.4 → user sees lockscreen and can interact to unlock
      },
      {
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Prevent iOS bounce
      document.body.style.touchAction = 'none';
      document.documentElement.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
    };
  }, [isExpanded]);

  const [isHoverEnabled, setIsHoverEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    setIsHoverEnabled(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsHoverEnabled(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isHoverEnabled) {
      resetCursor();
      return;
    }

    if (isExpanded) {
      if (!isPhoneHovered) {
        setCursor('close', 'Click to unfocus');
      } else if (isScreenHovered) {
        // PhoneCursor handles 'hidden' state when it's active inside the screen
        // Wait for PhoneCursor to take over
      } else {
        resetCursor();
      }
    } else {
      if (isSectionHovered) {
        setCursor('interact', 'Click to interact');
      } else {
        resetCursor();
      }
    }
  }, [isExpanded, isHoverEnabled, isSectionHovered, isPhoneHovered, isScreenHovered, setCursor, resetCursor]);

  const isCustomCursorActive = isHoverEnabled && ((!isExpanded && isSectionHovered) || (isExpanded && !isPhoneHovered));

  return (
    <section
      ref={sectionRef}
      id="app-dev"
      onClick={() => {
        if (!isExpanded) handleToggle(true);
      }}
      style={{ zIndex: isExpanded ? 9999 : 1 }}
      className={cn(
        "bg-transparent pt-12 relative w-full overflow-hidden",
        isCustomCursorActive ? "cursor-none [&_*]:cursor-none" : ""
      )}
    >
      {/* ── SIDE LABELS + PHONE ── */}
      <div className="flex items-center justify-between pb-16 w-full">

        {/* Left "APP DEV" — hollow stroke */}
        <div className="flex items-center justify-center px-2 sm:px-3 md:px-5 shrink-0">
          <span
            className="font-kanit font-black uppercase select-none leading-none tracking-tight"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize: 'clamp(1.5rem, 4vw, 90px)',
              WebkitTextStroke: '1.5px rgba(215,226,234,0.18)',
              color: 'transparent',
            }}
          >
            App Dev
          </span>
        </div>

        {/* ── PHONE CONTAINER (FLEX-1 centered) ── */}
        <div className="flex-1 flex justify-center overflow-visible relative">

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleToggle(false)}
                className={cn(
                  "fixed inset-0 z-40 bg-[#0C0C0C]/80 backdrop-blur-md cursor-none"
                )}
              />
            )}
          </AnimatePresence>

          <motion.div
            layout
            ref={phoneRef}
            className={
              isExpanded
                ? "fixed inset-0 m-auto z-50 shrink-0 cursor-default flex items-center justify-center"
                : "relative shrink-0"
            }
            style={
              isExpanded
                ? { width: 'clamp(280px, 40vw, 400px)', height: 'fit-content' }
                : { width: 'clamp(220px, 35vw, 380px)' }
            }
            onClick={() => { if (!isExpanded) handleToggle(true); }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Ambient radial glow behind phone */}
            <div
              className="absolute inset-0 pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(ellipse at 50% 45%, rgba(215,226,234,0.03) 0%, transparent 60%)',
                transform: 'scale(1.4)',
              }}
            />

            {/* Android SVG hardware shell */}
            <Android
              className="w-full h-auto pointer-events-none select-none"
              style={{ display: 'block' }}
            />

            {/* Interactive screen overlay */}
            <div
              ref={screenRef}
              className={cn("absolute overflow-hidden", isExpanded ? "pointer-events-auto" : "pointer-events-none")}
              style={{
                left: '2.08%',
                top: '1.59%',
                width: '83.14%',
                height: '90.70%',
                borderRadius: '9%',
                contain: 'layout paint',
              }}
            >
              <Suspense fallback={null}>
                <MobileOS mode="query" isFocused={isExpanded} />
              </Suspense>
            </div>
          </motion.div>
        </div>

        {/* Right "APP DEV" */}
        <div className="flex items-center justify-center px-2 sm:px-3 md:px-5 shrink-0">
          <span
            className="font-kanit font-black uppercase select-none leading-none tracking-tight"
            style={{
              writingMode: 'vertical-rl',
              fontSize: 'clamp(1.5rem, 4vw, 90px)',
              WebkitTextStroke: '1.5px rgba(215,226,234,0.18)',
              color: 'transparent',
            }}
          >
            App Dev
          </span>
        </div>

      </div>
    </section>
  );
}
