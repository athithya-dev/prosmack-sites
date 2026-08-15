'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

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

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const cardWidth = target.offsetWidth * 0.85;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveMobileIndex(Math.min(Math.max(index, 0), slides.length - 1));
  };

  const scrollMobileTo = (index: number) => {
    if (!mobileScrollRef.current) return;
    const cardWidth = mobileScrollRef.current.offsetWidth * 0.85 + 16;
    mobileScrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(index);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background overflow-hidden border-t border-foreground/10"
    >
      {/* ── DESKTOP VIEW (Pinned Horizontal Canvas) ─────────────────── */}
      <div className="hidden lg:block w-full">
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

      {/* ── MOBILE & TABLET VIEW (Zero-Gap Native Swipe Deck) ───────── */}
      <div className="block lg:hidden w-full py-12 px-5 sm:px-8">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase">
              Core Experiences
            </span>
          </div>
          <span className="text-[11px] font-mono text-secondary">
            {activeMobileIndex + 1} / {slides.length}
          </span>
        </div>

        {/* Swipeable Carousel */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.num}
              className="w-[88vw] sm:w-[72vw] flex-shrink-0 snap-center rounded-3xl bg-surface/95 border border-foreground/15 p-6 sm:p-8 flex flex-col justify-between min-h-[360px] relative overflow-hidden shadow-xl backdrop-blur-md"
            >
              {/* Subtle Card Background Number */}
              <div className="absolute top-2 right-4 text-8xl font-black text-outline opacity-5 leading-none pointer-events-none">
                {slide.num}
              </div>

              {/* Top Meta */}
              <div>
                <span className="text-xs tracking-widest text-accent uppercase font-bold block mb-2.5 font-mono">
                  {slide.num} — {slide.tag}
                </span>
                <h3 className="font-satoshi font-black text-3xl sm:text-4xl text-foreground uppercase tracking-tight leading-tight">
                  {slide.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-secondary text-sm sm:text-base leading-relaxed mt-4 mb-5 font-normal">
                {slide.desc}
              </p>

              {/* Footer Progress Tag */}
              <div className="pt-4 border-t border-foreground/10 flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-secondary font-semibold">
                  ProSmack Studio
                </span>
                <span className="text-accent text-sm font-bold font-mono">
                  0{i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Dots & Arrows */}
        <div className="flex items-center justify-between pt-4 mt-2">
          <div className="flex gap-2 items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollMobileTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeMobileIndex ? 'w-8 bg-accent' : 'w-2.5 bg-foreground/20'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollMobileTo(Math.max(0, activeMobileIndex - 1))}
              disabled={activeMobileIndex === 0}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center text-foreground hover:border-accent hover:text-accent disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollMobileTo(Math.min(slides.length - 1, activeMobileIndex + 1))}
              disabled={activeMobileIndex === slides.length - 1}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center text-foreground hover:border-accent hover:text-accent disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
