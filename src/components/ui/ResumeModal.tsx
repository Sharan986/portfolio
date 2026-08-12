'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';

export default function ResumeModal() {
  const { isOpen, closeResume } = useResumeStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeResume}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 z-[101] flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <h3 className="font-kanit font-medium text-lg tracking-wide text-[#D7E2EA]">Resume Preview</h3>
              <div className="flex items-center gap-3">
                <a
                  href="/Gursharan_Singh_CV.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#D7E2EA] transition-colors text-sm font-medium"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  onClick={closeResume}
                  className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content (PDF iframe) */}
            <div className="flex-1 w-full bg-[#111]">
              <iframe
                src="/Gursharan_Singh_CV.pdf#toolbar=0&navpanes=0&scrollbar=0"
                className="w-full h-full border-none"
                title="Resume PDF"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
