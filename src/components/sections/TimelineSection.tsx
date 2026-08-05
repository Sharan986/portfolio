'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ActivityHeatmap from '@/components/ui/ActivityHeatmap';

/* ── Timeline Data ── */
const timelineData = [
  {
    year: '2026',
    items: [
      {
        title: 'CCS — Technical Lead',
        date: 'May 2026 – Present',
        description: [
          'Leading technical infrastructure and engineering systems for campus initiatives',
          'Building developer-facing platforms and operational tooling',
          'Managing technical execution pipelines and engineering direction',
          'Coordinating technical teams across products and events',
        ],
      },
      {
        title: 'Hackathon Achievements',
        date: '2026',
        description: [
          'Winner at Young Indians IDS 2026 (6-week innovation challenge)',
          'Winner at Google TechSprint Hackathon, GDGOC AJU',
        ],
      },
      {
        title: 'CCS — Team Lead',
        date: 'Oct 2025 – May 2026',
        description: [
          'Led technical event execution and organizing teams',
          'Coordinated registrations, logistics, and technical operations',
          'Mentored contributors on Git/GitHub and collaborative workflows',
          'Improved event execution systems and participation structure',
        ],
      },
    ],
  },
  {
    year: '2025',
    items: [
      {
        title: 'HackHorizon / Event Systems',
        date: '',
        description: [
          'Worked on event infrastructure, registration systems, and technical execution pipelines',
          'Focused on scalable participation and smoother operational tooling',
        ],
      },
      {
        title: 'Freelance Software Developer',
        date: '2025',
        description: [
          'Delivered end-to-end web applications and digital solutions for international clients',
          'Managed project requirements, technical architecture, and successful deployments',
          'Built robust, scalable, and beautifully designed user interfaces',
        ],
      },
      {
        title: 'Hackathon & Product Ecosystem Phase',
        date: '',
        description: [
          'Built and experimented with multiple production-oriented systems',
          'Started shifting from projects toward platform/product thinking',
        ],
      },
    ],
  },
  {
    year: '2024',
    items: [
      {
        title: 'Ideation Fiesta — JUT',
        date: '',
        description: [
          'Won recognition and grant support for startup/product development',
          'Presented early-stage product systems and execution thinking',
        ],
      },
      {
        title: 'RooTrove / RootCraft',
        date: '',
        description: [
          'Built an e-commerce initiative focused on promoting Jharkhand handicrafts and artisan ecosystems',
          'Secured an early product order through institutional sourcing',
          'Explored product + commerce systems beyond standard student projects',
        ],
      },
    ],
  },
];

/* Flatten all items into a single array with year context */
type FlatItem = {
  year: string;
  title: string;
  date: string;
  description: string[];
  globalIndex: number;
  isFirstInYear: boolean;
};

function flattenTimeline(): FlatItem[] {
  const items: FlatItem[] = [];
  let globalIndex = 0;
  for (const group of timelineData) {
    for (let i = 0; i < group.items.length; i++) {
      items.push({
        year: group.year,
        title: group.items[i].title,
        date: group.items[i].date,
        description: group.items[i].description,
        globalIndex,
        isFirstInYear: i === 0,
      });
      globalIndex++;
    }
  }
  return items;
}

const flatItems = flattenTimeline();

/* ── Main Component ── */
export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="bg-transparent relative w-full pt-32 pb-32 overflow-hidden flex flex-col items-center"
    >
      {/* ── SECTION HEADER ── */}
      <div className="flex items-center justify-center pt-10 pb-20 w-full px-6">
        <h2 className="hero-heading font-kanit font-black uppercase tracking-tight leading-none text-[clamp(3rem,12vw,160px)] m-0 pb-2 text-center flex items-center justify-center gap-4 md:gap-8">
          Timeline
          <motion.img 
            src="https://res.cloudinary.com/dvrx7mkxf/image/upload/v1783103143/3dicons-calender-dynamic-color_qphjb9.webp"
            alt="Calendar icon"
            className="w-[clamp(4rem,10vw,120px)] h-[clamp(4rem,10vw,120px)] object-contain drop-shadow-2xl"
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </h2>
      </div>

      {/* ── TWO-COLUMN WRAPPER ── */}
      <div className="w-full max-w-[1200px] px-6 md:px-12 mx-auto flex flex-col lg:flex-row gap-16 lg:gap-12 items-start justify-between">
        
        {/* ── TIMELINE CONTAINER (Left) ── */}
        <div className="relative w-full lg:w-3/5 xl:w-2/3">
          {/* Vertical Line */}
          <div className="absolute left-[5px] top-4 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D7E2EA]/10 to-transparent">
            <motion.div
              className="w-full bg-[#D7E2EA]/30 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* ── Entries ── */}
          <div className="flex flex-col w-full gap-0">
            {flatItems.map((item) => (
              <TimelineEntry key={item.globalIndex} item={item} />
            ))}
          </div>
        </div>

        {/* ── HEATMAP CONTAINER (Right, Sticky) ── */}
        <div className="w-full lg:w-2/5 xl:w-1/3 sticky top-32">
          <ActivityHeatmap />
        </div>
        
      </div>
    </section>
  );
}

/* ── Individual Entry ── */
function TimelineEntry({ item }: { item: FlatItem }) {
  return (
    <div className={item.isFirstInYear ? 'mt-12 first:mt-0' : ''}>
      {/* Year marker — only for the first item in each year group */}
      {item.isFirstInYear && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center mb-8"
        >
          {/* Node dot on the line */}
          <div className="w-[11px] h-[11px] rounded-full bg-[#0C0C0C] border-[2px] border-[#D7E2EA]/50 shrink-0 z-10" />
          <h3 className="ml-6 md:ml-10 font-kanit font-bold text-2xl md:text-3xl text-white/90 tracking-tight">
            v.{item.year}
          </h3>
        </motion.div>
      )}

      {/* Role Block — the .timeline-entry class drives the CSS hover-to-focus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{
          duration: 0.5,
          delay: item.globalIndex * 0.08,
          ease: 'easeOut',
        }}
        className="timeline-entry pl-[1.5rem] md:pl-[3.5rem] pb-10 group"
      >
        {/* Title + Date */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
          <h4 className="font-inter font-bold text-lg md:text-xl text-white tracking-tight">
            {item.title}
          </h4>
          {item.date && (
            <span className="font-inter text-sm text-[#888] whitespace-nowrap">
              {item.date}
            </span>
          )}
        </div>

        {/* Description with // prefix */}
        <ul className="flex flex-col gap-2.5 mt-3 list-none p-0 m-0">
          {item.description.map((desc, dIndex) => (
            <li
              key={dIndex}
              className="font-inter text-sm sm:text-[15px] text-[#D7E2EA]/55 leading-relaxed flex items-start"
            >
              <span className="text-[#D7E2EA]/20 mr-3 mt-[0.1em] text-xs font-mono shrink-0 select-none">
                //
              </span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
