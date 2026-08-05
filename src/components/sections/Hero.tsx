'use client';

import Magnet from '@/components/ui/Magnet';
import FadeIn from '@/components/ui/FadeIn';
import ContactButton from '@/components/ui/ContactButton';

export default function Hero() {
  return (
    <main className="hero relative w-full overflow-hidden bg-[#0C0C0C] min-h-screen md:h-screen md:min-h-[800px]">
      {/* Big text behind image */}
      <div className="hero-big-text creator-text-animate absolute bottom-[-25px] left-0 right-0 z-[2] pointer-events-none w-full text-center flex items-end justify-center pb-4 md:pb-8">
        <h2 className="font-medium text-white/5 leading-[0.75] tracking-[-0.02em] whitespace-nowrap text-[clamp(100px,26vw,500px)] m-0">Builder</h2>
      </div>

      {/* Content */}
      <div className="hero-content relative z-[8] flex flex-col justify-between w-full h-full px-6 md:px-10 pt-6 md:pt-8 pointer-events-none md:absolute md:inset-0">

        {/* Hero Heading */}
        <FadeIn delay={0.15} y={40} className="overflow-hidden pointer-events-auto">
          <h1 className="hero-heading font-kanit font-black uppercase tracking-tight leading-none w-full m-0 text-[15vw] sm:text-[9vw] md:text-[10vw] lg:text-[9.5vw] mt-6 sm:mt-4 md:mt-8">
            Hi, i&apos;m<br className="block sm:hidden" /> Gursharan
          </h1>
        </FadeIn>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-12 sm:pb-8 md:pb-10 pointer-events-auto">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug m-0 max-w-[240px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: 'clamp(0.9rem, 4vw, 1.5rem)' }}
            >
              Software developer crafting bold and unforgettable experiences
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>

      {/* Hero Portrait — always visible, Magnet handles the pointer interaction */}
      <Magnet
        padding={150}
        strength={3}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[75vw] max-w-[320px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
      >
        <img
          src="https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783059551/hero-character_cyka4u.webp"
          alt="Hero portrait"
          className="w-full h-auto object-contain pointer-events-none select-none"
          draggable={false}
        />
      </Magnet>
    </main>
  );
}
