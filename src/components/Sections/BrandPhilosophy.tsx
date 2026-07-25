'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const philosophyWords = [
  { text: 'Influence', top: '10%', left: '2%', speed: 1.2 },
  { text: 'Authority', top: '25%', left: '60%', speed: 0.8 },
  { text: 'Vision', top: '75%', left: '2%', speed: 1.5 },
  { text: 'Growth', top: '70%', left: '58%', speed: 1.0 },
  { text: 'Recognition', top: '42%', left: '0%', speed: 1.3 },
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
      wordsRef.current.forEach((wordEl, index) => {
        if (!wordEl) return;

        const rect = wordEl.getBoundingClientRect();
        const wordX = rect.left + rect.width / 2;
        const wordY = rect.top + rect.height / 2;

        const diffX = wordX - clientX;
        const diffY = wordY - clientY;
        const distance = Math.hypot(diffX, diffY);

        // If mouse is within 180px, push the word away
        const threshold = 180;
        if (distance < threshold) {
          const power = (threshold - distance) / threshold; // 0 to 1
          const pushX = (diffX / distance) * power * 60; // Max push of 60px
          const pushY = (diffY / distance) * power * 60;

          gsap.to(wordEl, {
            x: pushX,
            y: pushY,
            scale: 1.1,
            color: 'var(--accent)',
            textShadow: '0 0 15px rgba(234, 13, 35, 0.4)',
            duration: 0.4,
            ease: 'power2.out',
          });
        } else {
          // Return to home position
          gsap.to(wordEl, {
            x: 0,
            y: 0,
            scale: 1,
            color: 'var(--foreground)',
            textShadow: 'none',
            duration: 0.8,
            ease: 'power3.out',
          });
        }
      });

      // 2. Parallax effect on Portrait Image
      if (portraitContainerRef.current) {
        const moveX = (clientX - window.innerWidth / 2) * 0.02;
        const moveY = (clientY - window.innerHeight / 2) * 0.02;

        gsap.to(portraitContainerRef.current, {
          x: moveX,
          y: moveY,
          duration: 1,
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
      className="relative w-full min-h-screen bg-background py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Glow decorative blobs */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/2 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10">
        
        {/* Left Side: Portrait & floating words canvas */}
        <div className="lg:col-span-6 flex items-center justify-center w-full">
          <div className="relative w-full max-w-[280px] sm:w-80 md:w-[420px] aspect-[3/4] flex items-center justify-center select-none">
            
            {/* Portrait Image Container (Centered relative to container) */}
            <div
              ref={portraitContainerRef}
              className="relative w-[65%] aspect-[2/3] rounded-lg overflow-hidden border border-white/10 shadow-2xl transform-gpu"
            >
              <Image
                src="/philosophy_portrait.jpg"
                alt="Brand Philosophy Portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Interactive Floating Words (Relative to parent container bounds) */}
            {philosophyWords.map((word, index) => (
              <div
                key={word.text}
                ref={(el) => {
                  if (el) wordsRef.current[index] = el;
                }}
                className="absolute font-satoshi font-black text-base sm:text-xl md:text-3xl lg:text-3xl xl:text-4xl uppercase tracking-tighter text-foreground cursor-default select-none transition-shadow duration-300 transform-gpu z-20 whitespace-nowrap"
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
        <div className="lg:col-span-6 flex flex-col items-start justify-center gap-6">
          <span className="text-accent font-satoshi text-xs md:text-sm tracking-[0.4em] uppercase font-bold">
            Our Belief
          </span>
          <h2 className="font-satoshi font-black text-4xl md:text-6xl text-foreground uppercase tracking-tight leading-none">
            Attention is the New Currency.
          </h2>
          <div className="w-20 h-[2px] bg-accent" />
          <p className="text-secondary text-sm md:text-lg leading-relaxed max-w-xl">
            In an over-saturated digital landscape, noise is abundant but attention is scarce. We don't just build websites, design brands, or publish content. We build systems that capture attention, validate authority, and scale influence. 
          </p>
          <p className="text-secondary/70 text-xs md:text-sm leading-relaxed max-w-xl">
            If your brand isn't commanding attention, you are invisible. We redefine branding from a passive identity to an active force of market gravity.
          </p>
        </div>
      </div>
    </section>
  );
}
