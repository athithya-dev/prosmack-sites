'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    num: '01',
    title: 'Discover',
    tagline: 'AUDITING & ALIGNMENT',
    desc: 'We deep dive into your business model, current brand standing, and competitors to locate market gaps and key opportunities.',
  },
  {
    num: '02',
    title: 'Research',
    tagline: 'AUDIENCE & BEHAVIOR INTEL',
    desc: 'We gather quantitative and qualitative data on your target market\'s digital habits, desires, and psychological triggers.',
  },
  {
    num: '03',
    title: 'Strategy',
    tagline: 'BRAND POSITIONING SYSTEM',
    desc: 'We construct your positioning roadmap, content system, and campaign architecture, engineering your unique brand gravity.',
  },
  {
    num: '04',
    title: 'Create',
    tagline: 'PREMIUM ASSET PRODUCTION',
    desc: 'We design and build the digital interfaces, high-end videos, and marketing campaign assets designed to convert attention.',
  },
  {
    num: '05',
    title: 'Scale',
    tagline: 'EXECUTION & DISTRIBUTION',
    desc: 'We launch, distribute, and optimize the campaigns, scaling your brand authority to secure market leadership.',
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const progressBar = progressBarRef.current;
    if (!container || !progressBar) return;

    // Create Master timeline for process transitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // 1. Animate the progress line scaleY directly with scroll
    tl.to(progressBar, {
      scaleY: 1,
      ease: 'none',
      duration: 5,
    }, 0);

    // 2. Animate step contents showing up and fading out
    processSteps.forEach((step, index) => {
      const stepEl = stepsRef.current[index];
      if (!stepEl) return;

      const number = stepEl.querySelector('.process-num');
      const title = stepEl.querySelector('.process-title');
      const tagline = stepEl.querySelector('.process-tagline');
      const desc = stepEl.querySelector('.process-desc');

      // Set initial values
      if (index > 0) {
        gsap.set([number, title, tagline, desc], { opacity: 0, y: 50, filter: 'blur(10px)' });
      }

      // Enter state timing (starts relative to scroll depth)
      if (index > 0) {
        tl.to([number, title, tagline, desc], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
        }, index - 0.2); // slight overlap
      }

      // Exit state timing (unless it is the final step)
      if (index < processSteps.length - 1) {
        tl.to([number, title, tagline, desc], {
          opacity: 0,
          y: -50,
          filter: 'blur(10px)',
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.in',
        }, index + 0.5);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full h-[500vh] bg-background"
    >
      <div className="sticky top-0 w-full h-screen flex overflow-hidden">
        {/* Left Side: Progress Indicator line */}
        <div className="hidden md:flex w-1/4 h-full flex-col justify-center items-center relative border-r border-white/5">
          <span className="text-secondary text-[10px] tracking-[0.3em] uppercase absolute top-16">
            WORKFLOW
          </span>

          {/* Vertical Track Line */}
          <div className="relative w-[2px] h-[45%] bg-white/10 origin-top">
            {/* Active Red Progress Line */}
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 w-full h-full bg-accent origin-top scale-y-0"
            />
          </div>

          <span className="text-foreground/40 text-[10px] tracking-[0.2em] uppercase absolute bottom-16">
            01 — 05 STEPS
          </span>
        </div>

        {/* Right Side: Step Contents */}
        <div className="w-full md:w-3/4 h-full relative flex items-center justify-center px-6 md:px-20">
          {/* Subtle logo vector watermark */}
          <div className="absolute right-0 bottom-0 text-[20vw] font-black text-outline opacity-2 select-none pointer-events-none translate-x-[10%] translate-y-[10%]">
            PROCESS
          </div>

          {processSteps.map((step, index) => (
            <div
              key={step.num}
              ref={(el) => {
                if (el) stepsRef.current[index] = el;
              }}
              className={`absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20 transition-all duration-300 ${
                index === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-100 pointer-events-none'
              }`}
            >
              {/* Massive Outline Number */}
              <div className="process-num font-satoshi font-black text-6xl sm:text-7xl md:text-[10vw] text-outline-accent leading-none mb-3 sm:mb-4">
                {step.num}
              </div>

              <div className="max-w-2xl">
                <span className="process-tagline text-xs sm:text-sm tracking-[0.25em] text-secondary uppercase font-bold block mb-2.5 sm:mb-3 font-mono">
                  {step.tagline}
                </span>

                <h3 className="process-title font-satoshi font-black text-4xl sm:text-5xl md:text-7xl text-foreground uppercase tracking-tight leading-none mb-4 sm:mb-6">
                  {step.title}
                </h3>

                <p className="process-desc text-secondary text-base sm:text-lg md:text-xl leading-relaxed max-w-xl font-normal">
                  {step.desc}
                </p>
              </div>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
}
