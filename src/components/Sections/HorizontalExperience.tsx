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

  useEffect(() => {
    const container = containerRef.current;
    const scrollSection = scrollSectionRef.current;
    if (!container || !scrollSection) return;

    // Calculate total scroll width
    const scrollWidth = scrollSection.scrollWidth - window.innerWidth;

    const pin = gsap.to(scrollSection, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1.1,
        start: 'top top',
        end: () => `+=${scrollSection.scrollWidth}`,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (slides.length - 1),
          duration: 0.5,
          delay: 0.1,
          ease: 'power1.inOut',
        },
      },
    });

    return () => {
      pin.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background overflow-hidden"
    >
      {/* Horizontal Slides Wrapper */}
      <div
        ref={scrollSectionRef}
        className="flex h-screen w-[500vw] transform-gpu"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.num}
            className="relative w-screen h-screen flex flex-col justify-between py-12 sm:py-24 px-6 md:px-16 border-r border-white/5 select-none overflow-hidden"
          >
            {/* Outline background number */}
            <div className="absolute top-0 right-0 text-[35vw] font-black text-outline opacity-5 leading-none translate-x-[15%] translate-y-[-10%] pointer-events-none">
              {slide.num}
            </div>

            {/* Top Bar Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 w-full">
              <span className="text-accent font-satoshi text-xs tracking-[0.3em] uppercase font-bold">
                EXPERIENCE — {slide.num}
              </span>
              <span className="text-secondary text-[10px] tracking-widest uppercase">
                PROSMACK STUDIO
              </span>
            </div>

            {/* Main Content Body */}
            <div className="max-w-4xl w-full z-10 my-auto">
              <span className="text-xs md:text-sm tracking-[0.25em] text-secondary uppercase font-semibold block mb-4">
                {slide.tag}
              </span>
              <h3 className="font-satoshi font-black text-4xl sm:text-6xl md:text-9xl text-foreground uppercase tracking-tight leading-none mb-6">
                {slide.title}
              </h3>
              <p className="text-secondary text-sm md:text-xl leading-relaxed max-w-xl">
                {slide.desc}
              </p>
            </div>

            {/* Bottom Progress details */}
            <div className="flex items-end justify-between w-full">
              <div className="flex gap-4 items-center">
                {slides.map((s, i) => (
                  <div
                    key={s.num}
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      i === index ? 'w-10 bg-accent' : 'w-4 bg-white/10'
                    }`}
                  />
                ))}
              </div>
              <span className="text-foreground/40 font-satoshi text-xs uppercase tracking-widest">
                SCROLL HORIZONTALLY
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
