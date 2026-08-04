import React from 'react';
import FadeIn from '@/components/ui/FadeIn';
import AnimatedText from '@/components/ui/AnimatedText';
import ContactButton from '@/components/ui/ContactButton';

export default function AboutSection() {
  return (
    <section className="bg-[#0C0C0C] relative w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden z-20">
      {/* Decorative 3D Images */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 pointer-events-none">
        <img 
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" 
          alt="" 
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>
      
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0 pointer-events-none">
        <img 
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" 
          alt="" 
          className="w-[100px] sm:w-[140px] md:w-[180px]"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 pointer-events-none">
        <img 
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" 
          alt="" 
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0 pointer-events-none">
        <img 
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" 
          alt="" 
          className="w-[130px] sm:w-[170px] md:w-[220px]"
        />
      </FadeIn>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto w-full">
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2 className="hero-heading font-kanit font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)] m-0 pb-2">
            About me
          </h2>
        </FadeIn>

        <div className="mt-10 sm:mt-14 md:mt-16 w-full flex justify-center">
          <AnimatedText 
            text="With extensive experience in software development, i focus on scalable backend architecture, interactive web design, and modern user experiences. I truly enjoy working with teams that aim to stand out and build their best products. Let's build something incredible together!" 
            className="text-[#D7E2EA] font-kanit font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]" 
          />
        </div>

        <div className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
