'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const pos = { x: -500, y: -500 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      const targetX = e.clientX - rect.left;
      const targetY = e.clientY - rect.top;

      gsap.to(pos, {
        x: targetX,
        y: targetY,
        duration: 0.6,
        ease: 'power3.out',
        onUpdate: () => {
          footer.style.setProperty('--footer-mouse-x', `${pos.x}px`);
          footer.style.setProperty('--footer-mouse-y', `${pos.y}px`);
        },
      });
    };

    footer.addEventListener('mousemove', handleMouseMove);
    return () => footer.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-background text-foreground pt-8 sm:pt-12 pb-20 sm:pb-24 px-5 sm:px-8 md:px-16 overflow-hidden select-none"
    >
      {/* Centered Ambient Lighting */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/5 rounded-full blur-[160px] -z-10" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center relative z-10">
        
        {/* Animated Spotlight "PROSMACK" Element */}
        <div
          ref={textRef}
          className="relative w-full flex justify-center items-center overflow-hidden cursor-default py-2 sm:py-4 my-2"
        >
          {/* Base Layer: Outlined Typography */}
          <div className="flex justify-center items-center w-full">
            <h4
              className="font-satoshi font-black text-6xl xs:text-7xl sm:text-8xl md:text-[18vw] tracking-tighter uppercase leading-none select-none opacity-30 text-center"
              style={{
                WebkitTextStroke: '1.5px var(--color-foreground, currentColor)',
                color: 'transparent',
              }}
            >
              PROSMACK
            </h4>
          </div>

          {/* Mask Layer: Illuminated Spotlight revealing glowing signature red text */}
          <div
            className="absolute inset-0 flex justify-center items-center pointer-events-none transition-all duration-75"
            style={{
              clipPath: 'circle(180px at var(--footer-mouse-x, -500px) var(--footer-mouse-y, -500px))',
            }}
          >
            <h4
              className="font-satoshi font-black text-6xl xs:text-7xl sm:text-8xl md:text-[18vw] tracking-tighter uppercase leading-none select-none text-accent text-center"
              style={{
                textShadow: '0 0 60px rgba(234, 13, 35, 0.5)',
              }}
            >
              PROSMACK
            </h4>
          </div>
        </div>

        {/* Minimal Copyright Metadata */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-foreground/10 text-xs sm:text-sm text-secondary font-medium">
          <span>© {new Date().getFullYear()} PROSMACK agency. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors duration-300">
              Terms of Use
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

