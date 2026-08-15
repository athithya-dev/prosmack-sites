'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const philosophyWords = [
  { text: 'Influence', top: '10%', left: '4%', speed: 1.2 },
  { text: 'Authority', top: '24%', left: '52%', speed: 0.8 },
  { text: 'Vision', top: '76%', left: '4%', speed: 1.5 },
  { text: 'Growth', top: '70%', left: '54%', speed: 1.0 },
  { text: 'Recognition', top: '44%', left: '2%', speed: 1.3 },
];

export default function BrandPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement[]>([]);
  const portraitContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // 1. Interactive Word Push Physics
      wordsRef.current.forEach((wordEl) => {
        if (!wordEl) return;

        const rect = wordEl.getBoundingClientRect();
        const wordX = rect.left + rect.width / 2;
        const wordY = rect.top + rect.height / 2;

        const diffX = wordX - clientX;
        const diffY = wordY - clientY;
        const distance = Math.hypot(diffX, diffY);

        const threshold = 160;
        if (distance < threshold) {
          const power = (threshold - distance) / threshold;
          const pushX = (diffX / distance) * power * 50;
          const pushY = (diffY / distance) * power * 50;

          gsap.to(wordEl, {
            x: pushX,
            y: pushY,
            scale: 1.08,
            color: 'var(--accent)',
            textShadow: '0 0 15px rgba(234, 13, 35, 0.4)',
            duration: 0.35,
            ease: 'power2.out',
          });
        } else {
          gsap.to(wordEl, {
            x: 0,
            y: 0,
            scale: 1,
            color: 'var(--foreground)',
            textShadow: 'none',
            duration: 0.7,
            ease: 'power3.out',
          });
        }
      });

      // 2. Parallax effect on Portrait Image
      if (portraitContainerRef.current) {
        const moveX = (clientX - window.innerWidth / 2) * 0.015;
        const moveY = (clientY - window.innerHeight / 2) * 0.015;

        gsap.to(portraitContainerRef.current, {
          x: moveX,
          y: moveY,
          duration: 0.9,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative w-full bg-background py-10 sm:py-16 md:py-24 flex flex-col justify-center items-center overflow-hidden border-t border-foreground/10"
    >
      {/* Glow decorative background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[160px] -z-10" />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side: Portrait & floating words canvas */}
        <div className="lg:col-span-6 flex items-center justify-center w-full">
          <div className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] aspect-[3/4] flex items-center justify-center select-none">
            
            {/* Portrait Image Container */}
            <div
              ref={portraitContainerRef}
              className="relative w-[68%] aspect-[2/3] rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl transform-gpu"
            >
              <Image
                src="/philosophy_portrait.jpg"
                alt="Brand Philosophy Portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Interactive Floating Words (Responsive sizes and bounded positions) */}
            {philosophyWords.map((word, index) => (
              <div
                key={word.text}
                ref={(el) => {
                  if (el) wordsRef.current[index] = el;
                }}
                className="absolute font-satoshi font-black text-xs sm:text-base md:text-xl lg:text-2xl uppercase tracking-tight text-foreground cursor-default select-none transition-shadow duration-300 transform-gpu z-20 whitespace-nowrap"
                style={{
                  top: word.top,
                  left: word.left,
                }}
              >
                {word.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Philosophy Statement */}
        <div className="lg:col-span-6 flex flex-col items-start justify-center gap-4 sm:gap-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/10 bg-foreground/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-accent font-satoshi text-xs tracking-[0.25em] uppercase font-bold">
              Our Belief
            </span>
          </div>

          <h2 className="font-satoshi font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-foreground uppercase tracking-tight leading-[1.08]">
            Attention is the <br className="hidden sm:inline" />
            <span className="text-accent">New Currency.</span>
          </h2>

          <div className="w-16 h-[2.5px] bg-accent" />

          <p className="text-secondary text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal">
            In an over-saturated digital landscape, noise is abundant but attention is scarce. We don&apos;t just build websites, design brands, or publish content. We build systems that capture attention, validate authority, and scale influence. 
          </p>

          <p className="text-secondary/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium">
            If your brand isn&apos;t commanding attention, you are invisible. We redefine branding from a passive identity to an active force of market gravity.
          </p>
        </div>

      </div>
    </section>
  );
}
