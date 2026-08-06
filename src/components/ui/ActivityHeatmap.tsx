'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

export default function ActivityHeatmap() {
  const data = useMemo(() => {
    // Generate flat array of 364 days
    const cells = [];
    for (let i = 0; i < WEEKS * DAYS_PER_WEEK; i++) {
      // Deterministic pseudo-random number based on index to prevent SSR hydration mismatch
      const r = Math.abs((Math.sin(i * 12.9898 + 78.233) * 43758.5453123) % 1);
      
      let intensity = 0;
      // Evenly distributed with lighter to darker shades
      if (r > 0.15) intensity = 1; // 25% chance
      if (r > 0.40) intensity = 2; // 25% chance
      if (r > 0.65) intensity = 3; // 20% chance
      if (r > 0.85) intensity = 4; // 15% chance
      cells.push(intensity);
    }
    return cells;
  }, []);

  const getColor = (intensity: number) => {
    switch (intensity) {
      case 1: return 'bg-[#73C5DE]/30 border-transparent';
      case 2: return 'bg-[#73C5DE]/50 border-transparent';
      case 3: return 'bg-[#73C5DE]/80 border-transparent';
      case 4: return 'bg-[#73C5DE] border-transparent';
      default: return 'bg-white/[0.02] border-white/[0.05]';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col w-full h-full lg:h-[1200px] p-6 rounded-[1.5rem] border border-white/[0.08] bg-[#0A0A0F]/60 backdrop-blur-xl shadow-2xl"
    >
      <div className="flex flex-col gap-1 mb-4 shrink-0">
        <h3 className="font-kanit text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          Activity
          <motion.img 
            src="https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783103142/3dicons-fire-dynamic-color_bcchew.webp"
            alt="Fire icon"
            className="w-6 h-6 md:w-8 md:h-8 object-contain drop-shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </h3>
        <p className="font-inter text-xs text-[#D7E2EA]/40 uppercase tracking-widest">Past Year</p>
      </div>

      {/* Grid Container: Horizontal scroll on mobile, full stretch on desktop */}
      <div className="flex-1 overflow-x-auto lg:overflow-hidden -mx-2 px-2 lg:mx-0 lg:px-0 scrollbar-hide flex">
        <div className="grid grid-rows-7 grid-flow-col lg:grid-rows-none lg:grid-cols-7 lg:grid-flow-row gap-1 lg:gap-1 w-max lg:w-full lg:h-full">
          {data.map((intensity, i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 lg:w-full lg:h-full rounded-sm border ${getColor(intensity)} transition-all duration-300 hover:border-white/50 cursor-crosshair`}
              title={`Activity level: ${intensity}`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 shrink-0 text-xs font-inter text-[#D7E2EA]/40">
        <span>Less</span>
        <div className="flex gap-1.5">
          <div className="w-3.5 h-3.5 rounded-[4px] bg-white/[0.02] border border-white/[0.05]"></div>
          <div className="w-3.5 h-3.5 rounded-[4px] bg-[#73C5DE]/30"></div>
          <div className="w-3.5 h-3.5 rounded-[4px] bg-[#73C5DE]/50"></div>
          <div className="w-3.5 h-3.5 rounded-[4px] bg-[#73C5DE]/80"></div>
          <div className="w-3.5 h-3.5 rounded-[4px] bg-[#73C5DE]"></div>
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
}
