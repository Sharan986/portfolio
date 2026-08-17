import { create } from 'zustand';

export type OSLayer = 'sleep' | 'lockscreen' | 'home' | 'app' | 'recents';

// Check sessionStorage for boot state (SSR-safe)
function hasBootedThisSession(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem('os-booted') === '1';
  } catch {
    return false;
  }
}

type OSStore = {
  /* ── Existing ── */
  isTransitioning: boolean;
  setTransitioning: (v: boolean) => void;

  /* ── Layer system ── */
  layer: OSLayer;
  setLayer: (l: OSLayer) => void;
  wake: () => void;       // sleep → lockscreen
  unlock: () => void;     // lockscreen → home

  /* ── Boot tracking ── */
  hasBooted: boolean;
  initBootState: () => void;
  markBooted: () => void;

  /* ── Notification shade ── */
  shadeOpen: boolean;
  openShade: () => void;
  closeShade: () => void;
  toggleShade: () => void;

  /* ── Recent apps ── */
  recentApps: string[];
  pushRecent: (id: string) => void;
  removeRecent: (id: string) => void;
  clearRecents: () => void;
};

export const useOSStore = create<OSStore>((set) => {
  const booted = hasBootedThisSession();

  return {
    /* ── Existing ── */
    isTransitioning: false,
    setTransitioning: (v) => set({ isTransitioning: v }),

    /* ── Layer system ── */
    layer: 'sleep',
    setLayer: (l) => set({ layer: l, shadeOpen: false }),
    wake: () => set((s) => s.layer === 'sleep' ? { layer: 'lockscreen' } : {}),
    unlock: () => set((s) => {
      if (s.layer === 'lockscreen') {
        try { sessionStorage.setItem('os-booted', '1'); } catch {}
        return { layer: 'home', hasBooted: true };
      }
      return {};
    }),

    /* ── Boot tracking ── */
    hasBooted: false,
    initBootState: () => {
      const booted = hasBootedThisSession();
      if (booted) {
        set((s) => ({
          hasBooted: true,
          layer: s.layer === 'sleep' || s.layer === 'lockscreen' ? 'home' : s.layer
        }));
      }
    },
    markBooted: () => {
      try { sessionStorage.setItem('os-booted', '1'); } catch {}
      set({ hasBooted: true });
    },

    /* ── Notification shade ── */
    shadeOpen: false,
    openShade: () => set({ shadeOpen: true }),
    closeShade: () => set({ shadeOpen: false }),
    toggleShade: () => set((s) => ({ shadeOpen: !s.shadeOpen })),

    /* ── Recent apps ── */
    recentApps: [],
    pushRecent: (id) => set((s) => {
      const filtered = s.recentApps.filter((r) => r !== id);
      return { recentApps: [id, ...filtered].slice(0, 4) };
    }),
    removeRecent: (id) => set((s) => ({
      recentApps: s.recentApps.filter((r) => r !== id),
    })),
    clearRecents: () => set({ recentApps: [] }),
  };
});

