'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';


export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 1. Initial taglines animation sequence
    const headline = headlineRef.current;
    if (!headline) return;

    // We split lines/characters manually for Awwwards-style staggered blur-reveal
    const lines = headline.querySelectorAll('.hero-line');
    gsap.set(lines, { opacity: 0, y: 100, filter: 'blur(15px)', scaleY: 1.5 });
    
    gsap.to(lines, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scaleY: 1,
      duration: 1.6,
      stagger: 0.25,
      ease: 'power4.out',
      delay: 0.8, // Wait for loader upward wipe to start
    });

    // 2. Mouse Parallax for Background outlined typography
    const handleMouseMove = (e: MouseEvent) => {

      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * -0.04;
      const moveY = (clientY - window.innerHeight / 2) * -0.04;

      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          x: moveX,
          y: moveY,
          duration: 1.2,
          ease: 'power2.out',
        });
      }

      // Spotlight tracking
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (

    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[100dvh] bg-background flex flex-col justify-center items-center px-5 sm:px-8 md:px-16 overflow-hidden text-center"
      style={{
        color: 'var(--foreground)',
        backgroundImage: 'radial-gradient(circle 550px at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--hero-gradient), transparent 80%)',
      }}
    >
      {/* Background Outlined Moving Typography */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0"
      >
        <h2 className="text-outline text-[14vw] sm:text-[12vw] md:text-[18vw] font-black tracking-tighter leading-none opacity-10 uppercase whitespace-nowrap">
          PROSMACK
        </h2>
        <h2 className="text-outline text-[12vw] sm:text-[10vw] md:text-[14vw] font-black tracking-widest leading-none opacity-5 uppercase whitespace-nowrap mt-3 sm:mt-4">
          REDEFINED
        </h2>
      </div>

      {/* Hero Content (Centered on All Screen Sizes) */}
      <div className="relative max-w-5xl mx-auto w-full z-10 py-12 sm:py-20 md:py-28 flex flex-col justify-center items-center text-center">
        <h1
          ref={headlineRef}
          className="font-satoshi font-black tracking-tight leading-[0.92] text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[7.5vw] text-center uppercase flex flex-col justify-center items-center gap-2 sm:gap-3"
        >
          <span className="hero-line block overflow-hidden transform-gpu text-foreground">
            Advertising.
          </span>
          <span className="hero-line block text-secondary overflow-hidden transform-gpu">
            Personal Branding.
          </span>
          <span className="hero-line block text-accent overflow-hidden transform-gpu">
            Without Limits.
          </span>
        </h1>

        {/* Mobile-First Centered Subtext */}
        <p className="mt-6 sm:mt-8 text-secondary text-sm sm:text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed text-center">
          We engineer cinematic advertising systems and high-authority brand ecosystems that capture attention and scale market gravity.
        </p>

        {/* Centered Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8 sm:mt-10">
          <a
            href="#featured-work"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-accent hover:bg-red-600 text-white font-satoshi font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-accent/25 active:scale-95 transition-all"
          >
            Featured Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-foreground/[0.05] hover:bg-foreground/[0.1] text-foreground border border-foreground/15 font-satoshi font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md active:scale-95 transition-all"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

