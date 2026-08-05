'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';

// Each project: Cloudinary screenshot + live URL
const projects = [
  {
    src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783085031/hackhorizon.online__vgqik3.webp',
    href: 'https://hackhorizon.online',
  },
  {
    src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783085152/ccs-cyan.vercel.app__a7qc3q.webp',
    href: 'https://ccs-cyan.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783085155/ieee-aju.vercel.app__iclvhb.webp',
    href: 'https://ieee-aju.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783085159/www.ramaeducare.in__hkyjch.webp',
    href: 'https://www.ramaeducare.in',
  },
  {
    src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783085162/collabase.vercel.app__zqilr1.webp',
    href: 'https://collabase.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783085165/www.onerepmaaxgym.in__xhrvlo.webp',
    href: 'https://www.onerepmaaxgym.in',
  },
  {
    src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783108194/fineprint-zenith.vercel.app__eoujlk.webp',
    href: 'https://fineprint-zenith.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783108188/zentry-dun.vercel.app__1_mvqhop.webp',
    href: 'https://zentry-dun.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783108191/www.provn.live__m2ex3e.webp',
    href: 'https://www.provn.live',
  },
];


// ThreeDMarquee slices the array into 4 equal columns sequentially.
// Stagger the rotation offset for each column so adjacent columns
// never show the same image at the same vertical position.
// Col 1 → offset 0
// Col 2 → offset 2
// Col 3 → offset 4
// Col 4 → offset 6
const rot = (offset: number) =>
  Array.from({ length: 15 }, (_, i) => projects[(i + offset) % projects.length]);

const projectImages = [
  ...rot(0),
  ...rot(2),
  ...rot(4),
  ...rot(6),
];


export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="bg-[#0C0C0C] relative z-30 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 w-full overflow-hidden"
    >
      {/* ── PROJECTS heading ── */}
      <div className="flex items-center justify-center pt-24 md:pt-32 pb-12 md:pb-20">
        <h2 className="hero-heading font-kanit font-black uppercase tracking-tight leading-none text-[clamp(3rem,12vw,160px)] m-0 pb-2 flex items-center justify-center gap-4 md:gap-8">
          Projects
          <motion.img
            src="https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783103140/3dicons-folder-dynamic-color_plfsui.webp"
            alt="Folder icon"
            className="w-[clamp(4rem,10vw,120px)] h-[clamp(4rem,10vw,120px)] object-contain drop-shadow-2xl"
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </h2>
      </div>

      {/* ── Side labels + Marquee ── */}
      <div className="flex items-center pb-10">

        {/* Left "WEB DEV" — hollow stroke, matches heading scale */}
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
            Web Dev
          </span>
        </div>

        {/* ── 3D Marquee — no rounding, no border ── */}
        <div className="flex-1 overflow-hidden">
          <ThreeDMarquee
            images={projectImages}
            className="w-full rounded-none h-[380px] sm:h-[500px] md:h-[620px] lg:h-[700px]"
          />
        </div>

        {/* Right "WEB DEV" */}
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
            Web Dev
          </span>
        </div>

      </div>
    </section>
  );
}
