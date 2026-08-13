import { create } from 'zustand';

interface ResumeStore {
  isOpen: boolean;
  openResume: () => void;
  closeResume: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  isOpen: false,
  openResume: () => set({ isOpen: true }),
  closeResume: () => set({ isOpen: false }),
}));
