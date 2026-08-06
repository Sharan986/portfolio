'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => (
        <AnimatedWord
          key={i}
          word={word}
          index={i}
          total={words.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function AnimatedWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block mr-[0.3em]">
      <span className="invisible whitespace-pre">{word}</span>
      <motion.span
        className="absolute left-0 top-0 whitespace-pre"
        style={{ opacity }}
      >
        {word}
      </motion.span>
    </span>
  );
}

