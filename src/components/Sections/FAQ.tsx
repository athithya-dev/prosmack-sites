'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How does ProSmack differ from standard branding agencies?',
    a: 'We operate at the intersection of cinematic production, luxury positioning, and bespoke technology. We do not use templates or cookie-cutter strategies. Every visual identity, campaign, and digital interface is custom-designed and coded to command maximum brand gravity and attention.',
  },
  {
    q: 'Which industries do you partner with?',
    a: 'We work primarily with high-growth technology companies, luxury brands, investment funds, executive leaders, and high-impact visionaries who require an elite digital footprint to build trust, command premiums, and scale influence.',
  },
  {
    q: 'How long does a branding and production project take?',
    a: 'A typical engagement runs between 6 to 12 weeks. This includes the initial research audit, core brand positioning strategy, design system drafting, copy/asset creation, and final launch verification. We prioritize precision and polish above all else.',
  },
  {
    q: 'Do you handle the actual production of brand assets?',
    a: 'Yes, we are a full-service creative engine. We manage the entire pipeline from design drafts and copywriting to professional 4K anamorphic video shooting, interactive WebGL/React development, and technical launch configurations.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-background py-14 sm:py-24 md:py-32 border-t border-foreground/10 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center">
        
        {/* Header — Centered for all devices with minimized mobile typography */}
        <div className="mb-8 sm:mb-12 md:mb-14 flex flex-col items-center text-center max-w-2xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] backdrop-blur-md mb-3 sm:mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-secondary">
              Information & FAQ
            </span>
          </div>
          
          <h2 className="font-satoshi font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-foreground uppercase tracking-tight leading-tight text-center">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
        </div>

        {/* Accordion Group — Centered & Optimized Typography for Mobile */}
        <div className="w-full max-w-3xl mx-auto flex flex-col border-t border-foreground/10">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={faq.q}
                className="border-b border-foreground/10 py-5 sm:py-6 md:py-8 flex flex-col transition-colors duration-200"
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left sm:text-left text-foreground group outline-none cursor-pointer gap-3 sm:gap-4"
                >
                  <h3 className="font-satoshi text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight group-hover:text-accent transition-colors duration-300 leading-snug">
                    {faq.q}
                  </h3>

                  {/* Plus/minus rotatable indicator */}
                  <div className="ml-2 sm:ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-foreground/15 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                    <motion.svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="sm:w-3.5 sm:h-3.5"
                    >
                      <path
                        d="M6 1V11M1 6H11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </div>
                </button>

                {/* Expandable Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 0.9,
                        marginTop: 12,
                        transition: { height: { duration: 0.35, ease: 'easeOut' }, opacity: { duration: 0.25 } },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        marginTop: 0,
                        transition: { height: { duration: 0.3, ease: 'easeIn' }, opacity: { duration: 0.2 } },
                      }}
                      className="overflow-hidden text-left pr-2 sm:pr-8 text-secondary text-sm sm:text-base md:text-lg leading-relaxed font-normal"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
