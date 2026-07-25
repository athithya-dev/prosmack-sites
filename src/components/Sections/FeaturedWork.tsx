'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Magnetic from '../Magnetic';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Apex Branding',
    category: 'REBRAND / PRODUCT ARCHITECTURE',
    description: 'A complete brand ecosystem overhaul for a next-generation technology unicorn. We restructured their visual guidelines, developed custom design systems, and launched their flagship platform.',
    results: [
      { label: 'Brand Equity', value: '+140%' },
      { label: 'Views Generated', value: '18M+' },
      { label: 'Platform Conversion', value: '+35%' },
    ],
    img: '/project_apex.jpg',
  },
  {
    title: 'Luxe Chrono',
    category: 'CAMPAIGN / VIDEO DIRECTION',
    description: 'An ultra-exclusive product release campaign for a heritage watchmaker. Our cinematic brand film and immersive storytelling generated high-intent demand worldwide.',
    results: [
      { label: 'Sell Out Time', value: '4 Mins' },
      { label: 'Total Revenue', value: '$4.2M' },
      { label: 'Social Engagement', value: '+280%' },
    ],
    img: '/project_luxe.jpg',
  },
  {
    title: 'Futura Network',
    category: 'DIGITAL EXPERIENCE / UI SYSTEM',
    description: 'Designing the interactive landscape for a revolutionary personal productivity application. We crafted every micro-interaction to feel weightless and responsive.',
    results: [
      { label: 'Store Downloads', value: '1.2M' },
      { label: 'App Store Rank', value: '#1' },
      { label: 'User Retention', value: '72%' },
    ],
    img: '/project_futura.jpg',
  },
];

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = slidesRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    // We animate the transitions between slides
    slides.forEach((slide, index) => {
      if (index === 0) return; // First slide is already visible

      const prevSlide = slides[index - 1];
      const image = slide.querySelector('.project-image');
      const textElements = slide.querySelectorAll('.slide-animate');

      // Initialize slide 2 and 3 clip-path (hidden below)
      gsap.set(slide, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      });
      gsap.set(image, { scale: 1.2, y: 100 });
      gsap.set(textElements, { opacity: 0, y: 50 });

      // Slide Wipe Transition
      tl.to(slide, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.5,
        ease: 'power3.inOut',
      }, `slide-${index}`)
      
      // Parallel parallax zoom on image
      .to(image, {
        scale: 1,
        y: 0,
        duration: 1.6,
        ease: 'power3.out',
      }, `slide-${index}`)

      // Parallel parallax shift on previous slide's content
      .to(prevSlide.querySelector('.project-image'), {
        y: -100,
        scale: 0.9,
        opacity: 0.3,
        duration: 1.5,
        ease: 'power3.inOut',
      }, `slide-${index}`)

      // Fade-in text for current slide
      .to(textElements, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
      }, `slide-${index}+=0.5`);
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
      id="featured-work"
      className="relative w-full h-[300vh] bg-background"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={(el) => {
              if (el) slidesRef.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full flex flex-col justify-end bg-background transform-gpu"
            style={{ zIndex: index + 10 }}
          >
            {/* Absolute Background Image Layer */}
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src={project.img}
                alt={project.title}
                fill
                priority={index === 0}
                className="project-image object-cover transform-gpu"
                sizes="100vw"
              />
              {/* Dark editorial overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/25 z-10" />
            </div>

            {/* Content Layer */}
            <div className="relative w-full max-w-7xl mx-auto px-6 md:px-16 pb-8 sm:pb-16 md:pb-24 z-20 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-end">
              {/* Left Column: Title and details */}
              <div className="lg:col-span-7 flex flex-col items-start gap-3 md:gap-4">
                <span className="slide-animate font-satoshi text-xs md:text-sm tracking-[0.4em] text-accent uppercase font-bold">
                  {project.category}
                </span>
                
                <h3 className="slide-animate font-satoshi font-black text-3xl sm:text-5xl md:text-8xl tracking-tight text-white uppercase leading-none">
                  {project.title}
                </h3>

                <p className="slide-animate text-white/70 text-[12px] sm:text-sm md:text-base leading-relaxed max-w-lg mt-1 md:mt-2">
                  {project.description}
                </p>

                <div className="slide-animate mt-3 md:mt-4">
                  <Magnetic range={40}>
                    <a
                      href="#contact"
                      className="px-6 py-3 sm:px-8 sm:py-3.5 bg-white text-black font-satoshi text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-accent hover:text-foreground hover:shadow-[0_0_20px_rgba(234,13,35,0.4)] transition-all duration-300"
                    >
                      View Case Study
                    </a>
                  </Magnetic>
                </div>
              </div>

              {/* Right Column: Performance Results metrics */}
              <div className="lg:col-span-5 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0">
                {project.results.map((res) => (
                  <div key={res.label} className="slide-animate flex flex-col">
                    <span className="font-satoshi font-black text-xl sm:text-2xl md:text-4xl text-white">
                      {res.value}
                    </span>
                    <span className="text-[9px] sm:text-[10px] tracking-wider text-white/50 uppercase mt-1">
                      {res.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
