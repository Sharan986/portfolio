'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = ""
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isActiveRef = useRef(false);
  const rafRef = useRef<number>(0);

  const applyTransform = useCallback((x: number, y: number, active: boolean) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    // Only update transition when active state changes to avoid style recalcs
    if (active !== isActiveRef.current) {
      isActiveRef.current = active;
      el.style.transition = active ? activeTransition : inactiveTransition;
    }
  }, [activeTransition, inactiveTransition]);

  const rectRef = useRef({ left: 0, top: 0, width: 0, height: 0 });

  useEffect(() => {
    const updateRect = () => {
      if (ref.current) {
        rectRef.current = ref.current.getBoundingClientRect();
      }
    };
    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true, capture: true });
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, { capture: true });
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return; // Skip if a frame is already pending
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        if (!ref.current) return;

        const { left, top, width, height } = rectRef.current;
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        if (
          e.clientX >= left - padding &&
          e.clientX <= left + width + padding &&
          e.clientY >= top - padding &&
          e.clientY <= top + height + padding
        ) {
          applyTransform(distX / strength, distY / strength, true);
        } else if (isActiveRef.current) {
          applyTransform(0, 0, false);
        }
      });
    };

    const handleMouseLeave = () => {
      applyTransform(0, 0, false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [padding, strength, applyTransform]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: 'transform', transition: inactiveTransition }}
    >
      {children}
    </div>
  );
}

