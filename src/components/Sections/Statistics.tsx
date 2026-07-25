'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    target: 250,
    suffix: '+',
    label: 'Projects Completed',
    desc: 'Delivering bespoke brand visual systems, interactive web applications, and comprehensive marketing setups.',
  },
  {
    target: 20,
    suffix: 'M+',
    label: 'Views Generated',
    desc: 'Organic impressions generated across major channels for our founders and personal brand executive partners.',
  },
  {
    target: 100,
    suffix: '+',
    label: 'Global Brands Scale',
    desc: 'From venture-backed technology startups to heritage luxury watchmakers and venture capital companies scaled.',
  },
];

export default function Statistics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const numEl = item.querySelector('.stat-number');
      const labelEl = item.querySelector('.stat-label');
      const descEl = item.querySelector('.stat-desc');
      const targetVal = stats[index].target;

      // Set initial values
      gsap.set(item, { opacity: 0, scale: 0.85, filter: 'blur(10px)' });

      // Create scroll animation trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate card scale/blur
      tl.to(item, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
      });

      // Animate numbers from 0 to target value
      const counterObj = { val: 0 };
      tl.to(counterObj, {
        val: targetVal,
        duration: 2,
        ease: 'power4.out',
        onUpdate: () => {
          if (numEl) {
            numEl.textContent = Math.floor(counterObj.val).toString();
          }
        },
      }, '-=0.8');

      // Stagger label and desc entrance
      tl.fromTo([labelEl, descEl],
        { opacity: 0, y: 15 },
        { opacity: 0.6, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out' },
        '-=1.4'
      );
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
      id="statistics"
      className="relative w-full bg-background py-24 md:py-36 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="flex flex-col items-center md:items-start p-8 rounded-lg bg-surface border border-white/5 shadow-2xl relative overflow-hidden group transform-gpu"
          >
            {/* Background glowing line */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 transition-all duration-700 group-hover:w-full" />

            <h3 className="font-satoshi font-black text-6xl md:text-8xl text-foreground tracking-tight flex items-baseline">
              <span className="stat-number">0</span>
              <span className="text-accent">{stat.suffix}</span>
            </h3>
            
            <p className="stat-label text-secondary text-xs md:text-sm tracking-widest uppercase font-semibold mt-4">
              {stat.label}
            </p>

            <p className="stat-desc text-secondary/60 text-xs md:text-sm mt-2 leading-relaxed">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
