import { create } from 'zustand';

export type CursorVariant = 'default' | 'project' | 'interact' | 'close' | 'hidden';

interface CursorState {
  variant: CursorVariant;
  text: string;
  setCursor: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  variant: 'default',
  text: '',
  setCursor: (variant, text = '') => set({ variant, text }),
  resetCursor: () => set({ variant: 'default', text: '' }),
}));
