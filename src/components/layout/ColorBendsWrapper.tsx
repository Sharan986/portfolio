'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ColorBends (Three.js) to avoid SSR issues
const ColorBends = dynamic(() => import('@/components/ui/ColorBends'), {
  ssr: false,
});

export default function ColorBendsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      {/* deeply absolute-positioned element with mask to fade in */}
      <div 
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 100%)',
        }}
      >
        <ColorBends
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          colors={['#0a022b', '#050a24', '#11052b', '#091533', '#1e0c3d']}
          rotation={90}
          speed={0.05}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent={true}
          autoRotate={0}
        />
      </div>

      {/* Content sections — stacked above the canvas */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
