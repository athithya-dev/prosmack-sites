'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const slides = [
  {
    num: '01',
    title: 'Brand Identity',
    tag: 'VISUAL SYSTEMS / TYPOGRAPHY / LOGO DESIGN',
    desc: 'Creating distinct visual dialects that translate brand essence into premium design signatures.',
  },
  {
    num: '02',
    title: 'Advertising',
    tag: 'CAMPAIGNS / EDITORIALS / EXPERIENTIAL',
    desc: 'Crafting unforgettable stories that hook user interest and build immediate brand resonance.',
  },
  {
    num: '03',
    title: 'Creative Direction',
    tag: 'ART DIRECTION / VISIONING / STYLING',
    desc: 'Establishing unified aesthetic guidelines that command respect and elevate project luxury.',
  },
  {
    num: '04',
    title: 'Campaign Strategy',
    tag: 'AUDIENCE INSIGHTS / PLATFORM ENGAGEMENT',
    desc: 'Architecting systematic communication flows that build consistent attention channels.',
  },
  {
    num: '05',
    title: 'Personal Branding',
    tag: 'EXECUTIVE PROFILES / INFLUENCE SYSTEMS',
    desc: 'Developing cohesive public personas that establish leaders as undisputed market authorities.',
  },
];

export default function HorizontalExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  // GSAP Horizontal Pinning ONLY for desktop (>=1024px)
  useEffect(() => {
    const container = containerRef.current;
    const scrollSection = scrollSectionRef.current;
    if (!container || !scrollSection) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const getScrollDistance = () => scrollSection.scrollWidth - window.innerWidth;

      gsap.to(scrollSection, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (

    <section
      ref={containerRef}
      className="hidden lg:block relative w-full bg-background overflow-hidden border-t border-foreground/10"
    >
      {/* ── DESKTOP VIEW (Pinned Horizontal Canvas) ─────────────────── */}
      <div className="w-full">
        <div
          ref={scrollSectionRef}
          className="flex h-screen w-[500vw] transform-gpu will-change-transform"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.num}
              className="relative w-screen h-screen flex flex-col justify-between py-16 md:py-20 px-10 md:px-16 border-r border-foreground/10 select-none overflow-hidden"
            >
              {/* Massive Outline Background Number */}
              <div className="absolute top-0 right-0 text-[35vw] font-black text-outline opacity-5 leading-none translate-x-[15%] translate-y-[-10%] pointer-events-none select-none">
                {slide.num}
              </div>

              {/* Top Bar Header */}
              <div className="flex items-center justify-between border-b border-foreground/10 pb-6 w-full z-10">
                <span className="text-accent font-satoshi text-sm tracking-[0.25em] uppercase font-bold">
                  EXPERIENCE — {slide.num}
                </span>
                <span className="text-secondary text-xs tracking-widest uppercase font-mono">
                  PROSMACK STUDIO
                </span>
              </div>

              {/* Main Content Body */}
              <div className="max-w-4xl w-full z-10 my-auto">
                <span className="text-sm tracking-[0.2em] text-secondary uppercase font-semibold block mb-4">
                  {slide.tag}
                </span>
                <h3 className="font-satoshi font-black text-6xl md:text-7xl lg:text-8xl text-foreground uppercase tracking-tight leading-[1.05] mb-6">
                  {slide.title}
                </h3>
                <p className="text-secondary text-base md:text-lg leading-relaxed max-w-xl font-normal">
                  {slide.desc}
                </p>
              </div>

              {/* Bottom Progress details */}
              <div className="flex items-end justify-between w-full z-10">
                <div className="flex gap-4 items-center">
                  {slides.map((s, i) => (
                    <div
                      key={s.num}
                      className={`h-[3px] rounded-full transition-all duration-500 ${
                        i === index ? 'w-12 bg-accent' : 'w-4 bg-foreground/15'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-secondary font-satoshi text-xs uppercase tracking-widest">
                  SCROLL TO NAVIGATE
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

