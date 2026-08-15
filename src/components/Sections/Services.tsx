'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CarouselStacked, { defaultSlides } from '@/components/ui/carousel-07';

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full bg-[#050505] text-white py-16 sm:py-24 md:py-28 overflow-hidden border-t border-white/5 z-20 select-none flex flex-col items-center justify-center"
    >

      {/* Centered Ambient Background Lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] sm:w-[550px] md:w-[700px] h-[220px] sm:h-[320px] bg-accent/5 rounded-full blur-[100px] sm:blur-[150px] -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Section Header: Perfectly Centered for ALL device sizes */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10 max-w-3xl px-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-3 sm:mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase">
              What We Offer
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black font-satoshi uppercase tracking-tight text-white leading-tight text-center"
          >
            Our Creative Services <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-500 to-orange-400">
              Command Gravity
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-secondary max-w-lg mx-auto font-normal leading-relaxed text-center"
          >
            Drag, swipe, or use navigation controls to explore our strategic capabilities and creative systems.
          </motion.p>
        </div>


        {/* Responsive Stacked 3D Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full flex justify-center items-center overflow-visible"
        >
          <CarouselStacked slides={defaultSlides} />
        </motion.div>

      </div>
    </section>
  );
}
