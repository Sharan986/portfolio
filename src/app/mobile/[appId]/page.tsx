import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import MobileOSWrapper from '@/components/mobile/MobileOSStandalone';
import { APPS } from '@/components/mobile/apps';

interface Props {
  params: Promise<{ appId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { appId } = await params;
  const app = APPS[appId];
  if (!app) return {};
  return {
    title: `${app.name} — G/OS`,
    description: `View ${app.name} project in the G/OS mobile portfolio`,
  };
}

export default async function MobileAppPage({ params }: Props) {
  const { appId } = await params;
  if (!APPS[appId]) notFound();

  return (
    <main className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
      <Suspense fallback={null}>
        <MobileOSWrapper pathAppId={appId} />
      </Suspense>
    </main>
  );
}
