'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursorStore } from '@/stores/cursor-store';

interface PhoneCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  active?: boolean;
}

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-interactive]';

export default function PhoneCursor({ containerRef, active = true }: PhoneCursorProps) {
  const [inside, setInside] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const hoveringRef = useRef(false);
  const pressedRef = useRef(false);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const rectRef = useRef({ left: 0, top: 0, width: 0, height: 0 });

  // Check if device supports hover
  useEffect(() => {
    const mediaQuery = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    setIsEnabled(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsEnabled(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Raw position values — updated on every mouse move
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-interpolated values — slight lag creates premium feel
  const x = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.6 });

  const updateCursorVisual = useCallback(() => {
    const el = cursorInnerRef.current;
    if (!el) return;
    const hovering = hoveringRef.current;
    const pressed = pressedRef.current;
    const scale = pressed ? 0.8 : hovering ? 1.5 : 1;
    el.style.transform = `scale(${scale})`;
    el.style.borderColor = hovering
      ? 'rgba(115, 197, 222, 0.5)'
      : 'rgba(215, 226, 234, 0.25)';
    el.style.backgroundColor = hovering ? 'rgba(115, 197, 222, 0.06)' : 'transparent';
  }, []);

  const handleMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = rectRef.current;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // Cancel any pending frame to avoid stacking
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rawX.set(cx);
      rawY.set(cy);
    });

    // Check if pointer is over an interactive element — update ref, not state
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const nowHovering = !!target?.closest(INTERACTIVE);
    if (nowHovering !== hoveringRef.current) {
      hoveringRef.current = nowHovering;
      updateCursorVisual();
    }
  }, [containerRef, rawX, rawY, updateCursorVisual]);

  const handleEnter = useCallback(() => {
    setInside(true);
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, [containerRef]);
  const handleLeave = useCallback(() => {
    setInside(false);
    hoveringRef.current = false;
    pressedRef.current = false;
  }, []);
  const handleDown = useCallback(() => {
    pressedRef.current = true;
    updateCursorVisual();
  }, [updateCursorVisual]);
  const handleUp = useCallback(() => {
    pressedRef.current = false;
    updateCursorVisual();
  }, [updateCursorVisual]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScrollOrResize = () => {
      if (inside && el) {
        rectRef.current = el.getBoundingClientRect();
      }
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('mousedown', handleDown);
    el.addEventListener('mouseup', handleUp);
    window.addEventListener('scroll', handleScrollOrResize, { passive: true, capture: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mouseleave', handleLeave);
      el.removeEventListener('mousedown', handleDown);
      el.removeEventListener('mouseup', handleUp);
      window.removeEventListener('scroll', handleScrollOrResize, { capture: true });
      window.removeEventListener('resize', handleScrollOrResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, handleMove, handleEnter, handleLeave, handleDown, handleUp, inside]);

  useEffect(() => {
    if (isEnabled && inside && active) {
      useCursorStore.getState().setCursor('hidden');
    }
    return () => {
      // Note: We don't necessarily reset on unmount here because AppDevSection handles the state when mouse leaves.
      // But we can reset it just in case, AppDevSection's effect will override it if needed.
    };
  }, [isEnabled, inside, active]);

  if (!isEnabled || !inside || !active) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999]"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        position: 'absolute',
      }}
    >
      <div
        ref={cursorInnerRef}
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: '1.5px solid rgba(215, 226, 234, 0.25)',
          backgroundColor: 'transparent',
          transition: 'transform 0.15s ease, border-color 0.15s ease, background-color 0.15s ease',
          willChange: 'transform',
        }}
      />
    </motion.div>
  );
}

