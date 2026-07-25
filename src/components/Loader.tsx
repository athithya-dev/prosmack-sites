'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

// Hershey Scriptc (Calligraphic Complex Script) font path data for lowercase "prosmack"
// x is the accumulated horizontal offset (tracking advance) for letters to connect
const lettersData = [
  {
    char: 'p',
    x: 0,
    paths: [
      { d: 'M0,17 L2,14 4,10', delay: 0.00, duration: 0.25 },
      { d: 'M5,7 L-4,34', delay: 0.16, duration: 0.25 },
      { d: 'M6,7 L-3,34', delay: 0.32, duration: 0.25 },
      { d: 'M3,16 L5,14 7,13 8,13 10,14 10,16 9,19 9,21 10,22', delay: 0.48, duration: 0.25 },
      { d: 'M8,13 L9,14 9,16 8,19 8,21 10,22 12,21 13,20 15,17', delay: 0.64, duration: 0.25 },
    ]
  },
  {
    char: 'r',
    x: 15.0,
    paths: [
      { d: 'M0,17 L2,14 4,13 6,14 6,16 4,22', delay: 0.80, duration: 0.25 },
      { d: 'M4,13 L5,14 5,16 3,22', delay: 0.96, duration: 0.25 },
      { d: 'M6,16 L8,14 10,13 11,13 10,16', delay: 1.12, duration: 0.25 },
      { d: 'M10,13 L10,16 11,18 12,18 14,17', delay: 1.28, duration: 0.25 },
    ]
  },
  {
    char: 'o',
    x: 27.0,
    paths: [
      { d: 'M7,13 L5,13 3,14 2,15 1,17 1,19 2,21 4,22 6,22 8,21 9,20 10,18 10,16 9,14 7,13 6,14 6,16 7,18 9,19 11,19 13,18 14,17', delay: 1.44, duration: 0.25 },
      { d: 'M5,13 L3,15 2,17 2,20 4,22', delay: 1.60, duration: 0.25 },
    ]
  },
  {
    char: 's',
    x: 41.0,
    paths: [
      { d: 'M0,17 L2,14 3,12 3,14 6,16 7,18 7,20 6,21 4,22', delay: 1.76, duration: 0.25 },
      { d: 'M3,14 L5,16 6,18 6,20 4,22', delay: 1.92, duration: 0.25 },
      { d: 'M0,21 L2,22 7,22 10,20 12,17', delay: 2.08, duration: 0.25 },
    ]
  },
  {
    char: 'm',
    x: 53.0,
    paths: [
      { d: 'M0,17 L2,14 4,13 6,14 6,16 4,22', delay: 2.24, duration: 0.25 },
      { d: 'M4,13 L5,14 5,16 3,22', delay: 2.40, duration: 0.25 },
      { d: 'M6,16 L8,14 10,13 11,13 13,14 13,16 11,22', delay: 2.56, duration: 0.25 },
      { d: 'M11,13 L12,14 12,16 10,22', delay: 2.72, duration: 0.25 },
      { d: 'M13,16 L15,14 17,13 18,13 20,14 20,16 19,19 19,21 20,22', delay: 2.88, duration: 0.25 },
      { d: 'M18,13 L19,14 19,16 18,19 18,21 20,22 22,21 23,20 25,17', delay: 3.04, duration: 0.25 },
    ]
  },
  {
    char: 'a',
    x: 77.0,
    paths: [
      { d: 'M10,16 L9,14 7,13 5,13 3,14 2,15 1,17 1,19 2,21 4,22 6,22 8,21 9,19', delay: 3.20, duration: 0.25 },
      { d: 'M5,13 L3,15 2,17 2,20 4,22', delay: 3.36, duration: 0.25 },
      { d: 'M11,13 L9,19 9,21 11,22 13,21 14,20 16,17', delay: 3.52, duration: 0.25 },
      { d: 'M12,13 L10,19 10,21 11,22', delay: 3.68, duration: 0.25 },
    ]
  },
  {
    char: 'c',
    x: 92.0,
    paths: [
      { d: 'M8,14 L7,15 8,15 8,14 7,13 5,13 3,14 2,15 1,17 1,19 2,21 4,22 7,22 10,20 12,17', delay: 3.84, duration: 0.25 },
      { d: 'M5,13 L3,15 2,17 2,20 4,22', delay: 4.00, duration: 0.25 },
    ]
  },
  {
    char: 'k',
    x: 104.0,
    paths: [
      { d: 'M0,17 L2,14 4,10', delay: 4.16, duration: 0.25 },
      { d: 'M7,1 L0,22', delay: 4.32, duration: 0.25 },
      { d: 'M8,1 L1,22', delay: 4.48, duration: 0.25 },
      { d: 'M9,13 L9,14 10,14 9,13 8,13 6,15 3,16', delay: 4.64, duration: 0.25 },
      { d: 'M3,16 L6,17 7,21 8,22', delay: 4.80, duration: 0.25 },
      { d: 'M3,16 L5,17 6,21 8,22 9,22 12,20 14,17', delay: 4.96, duration: 0.25 },
    ]
  }
];

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoImageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  const speed = 0.45; // Multiplier to control animation pace (smaller = faster)

  useEffect(() => {
    const line = lineRef.current;
    const logoImage = logoImageRef.current;
    if (!line || !logoImage) return;

    // Set initial GSAP states
    gsap.set(line, { scaleX: 0 });
    gsap.set(logoImage, { opacity: 0, scale: 0.85, filter: 'blur(10px)' });

    // Animate the line expansion immediately
    gsap.to(line, {
      scaleX: 1,
      duration: 1.5,
      ease: 'power2.out',
    });
  }, []);

  const handleHandwritingComplete = () => {
    // Prevent duplicate triggers if multiple callbacks fire
    if (animationTriggered) return;
    setAnimationTriggered(true);

    const container = containerRef.current;
    const logoImage = logoImageRef.current;
    const line = lineRef.current;
    const svg = svgRef.current;

    if (!container || !logoImage || !line || !svg) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Fade and blur out the cursive handwriting drawing
    tl.to(svg, {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(8px)',
      duration: 0.5,
      ease: 'power2.inOut',
    });

    // 2. Fade, un-blur, and scale in the official logo image
    tl.to(logoImage, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power4.out',
    }, '-=0.3');

    // 3. Collapse the red line slightly into a localized accent in the center
    tl.to(line, {
      scaleX: 0.25,
      backgroundColor: '#ea0d23',
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.5');

    // 4. Wipe the entire loader screen upward
    tl.to(container, {
      yPercent: -100,
      duration: 0.95,
      ease: 'power4.inOut',
    }, '+=0.3');
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-background z-[99999] flex flex-col justify-center items-center select-none overflow-hidden"
    >
      {/* Cinematic noise and vignette */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, #000 100%) pointer-events-none opacity-60" />
      
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg h-48">
        
        {/* Apple Hello-Style Cursive Handwriting SVG */}
        <motion.svg
          ref={svgRef}
          className="w-full max-w-[320px] sm:max-w-[420px] h-auto z-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-40 -10 1080 320"
          fill="none"
          stroke="#ea0d23" // Logo Accent Color (Red)
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <title>prosmack</title>
          {lettersData.map((letter) => (
            <g key={letter.char} transform={`translate(${letter.x * 8}, 0) scale(8)`}>
              {letter.paths.map((path, idx) => (
                <motion.path
                  key={idx}
                  d={path.d}
                  strokeWidth={1.5} // slightly thinner stroke for calligraphic details
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: path.duration * speed,
                    ease: "easeInOut",
                    delay: path.delay * speed,
                    opacity: { duration: 0.15 * speed, delay: path.delay * speed }
                  }}
                  onAnimationComplete={
                    letter.char === 'k' && idx === letter.paths.length - 1
                      ? handleHandwritingComplete
                      : undefined
                  }
                />
              ))}
            </g>
          ))}
        </motion.svg>

        {/* Official Logo Image Container (revealed on handwriting complete) */}
        <div ref={logoImageRef} className="absolute flex justify-center items-center w-64 h-16 pointer-events-none opacity-0">
          <Image
            src="/logo.png"
            alt="ProSmack Logo"
            width={240}
            height={50}
            priority
            className="object-contain"
          />
        </div>

        {/* Central Red Line */}
        <div
          ref={lineRef}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent/70 w-full origin-center"
        />
      </div>
    </div>
  );
}
