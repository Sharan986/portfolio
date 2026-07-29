'use client';

import React, { Suspense } from 'react';
import { Android } from '@/components/ui/android';
import MobileOS from '@/components/mobile/MobileOS';

interface Props {
  pathAppId: string | null;
}

// Standalone full-page phone — used by /mobile and /mobile/[appId] routes.
// "path" mode: activeApp is derived from pathAppId prop (passed from server page params).
export default function MobileOSStandalone({ pathAppId }: Props) {
  return (
    <div className="relative" style={{ width: 'clamp(260px, 40vw, 400px)' }}>
      <Android className="w-full h-auto pointer-events-none select-none" />
      <div
        className="absolute overflow-hidden pointer-events-auto"
        style={{
          left:         '2.08%',
          top:          '1.59%',
          width:        '83.14%',
          height:       '90.70%',
          borderRadius: '9%',
          contain:      'layout paint',
        }}
      >
        <Suspense fallback={null}>
          <MobileOS mode="path" pathAppId={pathAppId} />
        </Suspense>
      </div>
    </div>
  );
}
