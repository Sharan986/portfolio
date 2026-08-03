'use client';

import { useSyncExternalStore } from 'react';

// Single shared clock — one interval, multiple subscribers
let time = '';
let dateStr = '';
let dateLong = '';
let listeners: Set<() => void> = new Set();
let intervalId: ReturnType<typeof setInterval> | null = null;

function tick() {
  const now = new Date();
  time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  dateLong = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  // Start interval on first subscriber
  if (listeners.size === 0) {
    tick(); // Immediate first value
    intervalId = setInterval(tick, 10000);
  }
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    // Stop interval when no subscribers
    if (listeners.size === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

function getTime() { return time; }
function getDateShort() { return dateStr; }
function getDateLong() { return dateLong; }

// SSR-safe: return empty strings on server
function getServerTime() { return ''; }

export function useOSClock() {
  const t = useSyncExternalStore(subscribe, getTime, getServerTime);
  const ds = useSyncExternalStore(subscribe, getDateShort, getServerTime);
  const dl = useSyncExternalStore(subscribe, getDateLong, getServerTime);

  return { time: t, dateShort: ds, dateLong: dl };
}
