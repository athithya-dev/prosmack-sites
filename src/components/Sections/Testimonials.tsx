'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StaggerTestimonials, prosmackTestimonials } from '@/components/ui/stagger-testimonials';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#050505] text-white py-24 sm:py-32 md:py-40 border-t border-white/5 z-20 overflow-hidden select-none flex flex-col items-center justify-center"
    >
      {/* Centered Ambient Background Lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/5 rounded-full blur-[180px] -z-10" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Perfectly Centered Header Section */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase">
              Client Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black font-satoshi uppercase tracking-tight text-white leading-tight text-center"
          >
            Real Words From <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-500 to-orange-400">
              Our Visionary Clients
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-secondary max-w-lg mx-auto font-normal leading-relaxed text-center"
          >
            Click cards or use the arrows to explore genuine reviews from brand founders, journalists, and photographers who trusted Prosmack.
          </motion.p>
        </div>


        {/* Stagger Testimonials Interactive Animated Deck */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full flex justify-center items-center"
        >
          <StaggerTestimonials items={prosmackTestimonials} />
        </motion.div>

      </div>
    </section>
  );
}
