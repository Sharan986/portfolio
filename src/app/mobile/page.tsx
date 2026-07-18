import React, { Suspense } from 'react';
import MobileOSWrapper from '@/components/mobile/MobileOSStandalone';

export const metadata = {
  title: 'G/OS — Gursharan Singh',
  description: 'Interactive mobile OS portfolio by Gursharan Singh',
};

export default function MobilePage() {
  return (
    <main className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
      <Suspense fallback={null}>
        <MobileOSWrapper pathAppId={null} />
      </Suspense>
    </main>
  );
}
