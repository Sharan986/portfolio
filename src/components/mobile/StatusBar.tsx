'use client';

import React, { useEffect, useState } from 'react';

interface StatusBarProps {
  onTap?: () => void;
}

export default function StatusBar({ onTap }: StatusBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 right-0 h-10 z-30 flex items-center justify-between px-4 select-none"
      onClick={onTap}
      style={{
        cursor: onTap ? 'none' : undefined,
        background: 'rgba(10,10,15,0.3)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      data-interactive={onTap ? true : undefined}
    >
      {/* Brand */}
      <span className="font-kanit font-semibold text-[#D7E2EA]/35 text-[10px] tracking-widest uppercase">
        G/OS
      </span>

      {/* Time */}
      <span className="font-inter font-medium text-[#D7E2EA]/45 text-[11px] tabular-nums">
        {time}
      </span>

      {/* Icons */}
      <div className="flex items-center gap-2 pointer-events-none">
        {/* Signal bars */}
        <div className="flex items-end gap-[1.5px] h-[10px]">
          <div className="w-[2px] h-[3px] rounded-[0.5px] bg-[#D7E2EA]/25" />
          <div className="w-[2px] h-[5px] rounded-[0.5px] bg-[#D7E2EA]/25" />
          <div className="w-[2px] h-[7px] rounded-[0.5px] bg-[#D7E2EA]/25" />
          <div className="w-[2px] h-[10px] rounded-[0.5px] bg-[#D7E2EA]/25" />
        </div>
        {/* Wifi */}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#D7E2EA]/25">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="20" r="1" fill="currentColor"/>
        </svg>
        {/* Battery */}
        <svg width="16" height="9" viewBox="0 0 20 10" fill="none" className="text-[#D7E2EA]/25">
          <rect x="0.5" y="0.5" width="15" height="9" rx="2.5" stroke="currentColor" strokeWidth="1"/>
          <rect x="2" y="2" width="10.5" height="6" rx="1.5" fill="currentColor"/>
          <path d="M17 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}
