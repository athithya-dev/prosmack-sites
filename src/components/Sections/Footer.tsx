'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from '../Magnetic';

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
        duration: 0.7,
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

  const socialLinks = [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Dribbble', href: '#' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-white text-[#050505] pt-24 pb-12 px-6 md:px-16 overflow-hidden border-t border-black/5 select-none"
      style={{
        color: '#050505',
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full z-10 relative">
        {/* Top footer row: Responsive Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16 border-b border-black/10 pb-16">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-widest text-black/50 uppercase font-semibold">
              Explore
            </span>
            <div className="flex flex-col gap-2">
              {['Services', 'Featured Work', 'Philosophy', 'Process'].map((link) => (
                <Magnetic key={link} range={20}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="inline-block text-sm font-semibold hover:text-accent transition-colors duration-300 w-fit"
                  >
                    {link}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-widest text-black/50 uppercase font-semibold">
              Social Links
            </span>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <Magnetic key={link.label} range={20}>
                  <a
                    href={link.href}
                    className="inline-block text-sm font-semibold hover:text-accent transition-colors duration-300 w-fit"
                  >
                    {link.label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:col-span-2 gap-4 md:items-end md:text-right">
            <span className="text-[10px] tracking-widest text-black/50 uppercase font-semibold">
              The Manifesto
            </span>
            <p className="text-sm leading-relaxed text-black/75 max-w-sm md:text-right">
              We design digital products and experiences that help elite brands command attention and capture authority.
            </p>
          </div>
        </div>

        {/* Mid-Row: Interactive Gigantic Outlined Watermark with Mouse Spotlight */}
        <div
          ref={textRef}
          className="relative w-full h-[18vw] flex justify-center items-center overflow-hidden my-8 cursor-default"
        >
          {/* Base Layer: Outlined Text */}
          <div className="absolute inset-0 flex justify-center items-center">
            <h4
              className="font-satoshi font-black text-[17vw] tracking-tighter uppercase leading-none select-none"
              style={{
                WebkitTextStroke: '2px rgba(5, 5, 5, 0.12)',
                color: 'transparent',
              }}
            >
              PROSMACK
            </h4>
          </div>

          {/* Mask Layer: Filled/Illuminated Text revealed by mouse circle */}
          <div
            className="absolute inset-0 flex justify-center items-center pointer-events-none transition-all duration-75"
            style={{
              clipPath: 'circle(160px at var(--footer-mouse-x, -500px) var(--footer-mouse-y, -500px))',
            }}
          >
            <h4
              className="font-satoshi font-black text-[17vw] tracking-tighter uppercase leading-none select-none text-accent"
              style={{
                textShadow: '0 0 40px rgba(234, 13, 35, 0.3)',
              }}
            >
              PROSMACK
            </h4>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Metadata */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-black/10 pt-8 text-[11px] text-black/60 font-medium">
          <span>© {new Date().getFullYear()} PROSMACK agency. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="inline-block hover:text-accent transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="inline-block hover:text-accent transition-colors duration-300">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
