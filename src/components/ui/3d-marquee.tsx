"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useCallback, useEffect } from "react";
type MarqueeImage = string | { src: string; href?: string };

const getImgSrc = (img: MarqueeImage) =>
  typeof img === 'string' ? img : img.src;
const getImgHref = (img: MarqueeImage) =>
  typeof img === 'string' ? undefined : img.href;

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: MarqueeImage[];
  className?: string;
}) => {
  // Custom magnetic cursor logic
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const rectRef = useRef({ left: 0, right: 0, top: 0, bottom: 0 });

  useEffect(() => {
    const updateRect = () => {
      if (containerRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect();
      }
    };
    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.6 });

  const scrollRafRef = useRef<number>(0);

  useEffect(() => {
    const updateHoverState = () => {
      const rect = rectRef.current;
      const inBounds =
        lastMousePos.current.x >= rect.left &&
        lastMousePos.current.x <= rect.right &&
        lastMousePos.current.y >= rect.top &&
        lastMousePos.current.y <= rect.bottom;

      setIsHovering(inBounds);
    };

    const handleGlobalMove = (e: MouseEvent) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      updateHoverState();

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
      });
    };

    const handleScroll = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = 0;
        updateHoverState();
      });
    };

    window.addEventListener('mousemove', handleGlobalMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [rawX, rawY]);

  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-100 cursor-none relative",
        className,
      )}
      data-hide-cursor="true"
    >
      {/* Magnetic Cursor Overlay */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="pointer-events-none fixed z-[9999] flex items-center justify-center gap-2.5 px-5 py-3 bg-[#0c0c0c]/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full"
            style={{
              x,
              y,
              translateX: "-50%",
              translateY: "-50%",
              top: 0,
              left: 0,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#73C5DE] animate-pulse" />
            <span className="text-[11px] text-white/90 font-inter font-medium uppercase tracking-[0.2em] whitespace-nowrap">
              Click to open
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex size-full items-center justify-center pointer-events-auto">
        <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-[28rem] right-[65%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((image, imageIndex) => {
                  const src = getImgSrc(image);
                  const href = getImgHref(image);
                  const imgEl = (
                    <motion.img
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      src={src}
                      alt={`Image ${imageIndex + 1}`}
                      className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
                      width={970}
                      height={700}
                    />
                  );
                  return (
                    <div className="relative" key={imageIndex + src}>
                      <GridLineHorizontal className="-top-4" offset="20px" />
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block cursor-none"
                          data-interactive
                        >
                          {imgEl}
                        </a>
                      ) : imgEl}
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
