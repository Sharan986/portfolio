'use client';

import React, { useState } from 'react';

const IMAGES = [
  { src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783066411/hackhorizon.online__vgqik3.png', label: 'HackHorizon' },
  { src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783066409/ccs-cyan.vercel.app__a7qc3q.png', label: 'PROVN' },
  { src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783066405/ieee-aju.vercel.app__iclvhb.png', label: 'IEEE AJU' },
  { src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783066402/www.ramaeducare.in__hkyjch.png', label: 'Rama Educare' },
  { src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783066401/collabase.vercel.app__zqilr1.png', label: 'Collabase' },
  { src: 'https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783066400/www.onerepmaaxgym.in__xhrvlo.png', label: 'OneRepMaax' },
];

export default function GalleryApp() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="px-4 py-3 flex flex-col" style={{ color: '#D7E2EA' }}>
      {/* Header */}
      <div className="mb-3">
        <h2 className="font-kanit font-bold text-[15px] text-white leading-tight">Gallery</h2>
        <p className="text-[10px] text-[#D7E2EA]/25 font-kanit mt-0.5">Project screenshots</p>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {IMAGES.map((img, i) => (
          <button
            key={img.label}
            onClick={() => setLightbox(i)}
            className="relative aspect-[4/3] rounded-md overflow-hidden border border-white/[0.04]
                       cursor-none group"
            data-interactive
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover object-top
                         group-hover:scale-[1.03] transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1.5">
              <span className="text-[9px] font-kanit text-white/60">{img.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center cursor-none"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setLightbox(null)}
          data-interactive
        >
          <div className="relative w-full max-w-[95%] max-h-[80%]">
            <img
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox].label}
              className="w-full h-full object-contain rounded-lg"
            />
            <p className="text-center text-[11px] font-kanit text-[#D7E2EA]/40 mt-2">
              {IMAGES[lightbox].label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
