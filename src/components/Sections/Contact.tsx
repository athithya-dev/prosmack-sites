'use client';

import React from 'react';
import Magnetic from '../Magnetic';
import { FlowButton } from '../FlowButton';
import { Sparkles, ShieldCheck, Compass, Rocket } from 'lucide-react';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full bg-background text-foreground py-16 sm:py-24 md:py-28 px-5 sm:px-8 md:px-12 flex flex-col items-center justify-center border-t border-foreground/10 overflow-hidden text-center"
    >

      {/* Ambient center glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/5 rounded-full blur-[160px] -z-10" />

      {/* Main Centered Column Container */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10 gap-10 sm:gap-12 md:gap-14">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span className="text-xs sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-secondary">
            Next Phase & 1:1 Consulting
          </span>
        </div>

        {/* Cinematic Main Title */}
        <h2 className="font-satoshi font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.08] text-foreground text-center max-w-3xl mx-auto">
          Ready to build something{' '}
          <span className="text-accent">unforgettable?</span>
        </h2>

        {/* 1:1 Consulting Showcase Card */}
        <div className="w-full max-w-2xl mx-auto rounded-3xl bg-surface/90 border border-foreground/10 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] relative overflow-hidden transition-all duration-300 hover:border-foreground/20">
          
          {/* Card Top Accent Line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          {/* Card Body */}
          <div className="flex flex-col items-center justify-center text-center gap-6 sm:gap-7 px-5 sm:px-12 py-8 sm:py-14 w-full">
            
            <h3 className="font-satoshi font-bold text-xl sm:text-2xl md:text-3xl tracking-tight text-foreground leading-snug max-w-lg mx-auto">
              Reach us for personal 1:1 consulting for your brand or product.
            </h3>

            <p className="text-sm sm:text-base text-secondary leading-relaxed font-normal max-w-md mx-auto">
              Schedule a private strategy session with our creative and technical leadership. We'll audit your positioning, dissect your experience, and architect a customized growth roadmap.
            </p>

            {/* 3 Pillar Badges */}
            <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 w-full my-2">
              <div className="inline-flex items-center gap-2 py-2 px-3.5 sm:py-2.5 sm:px-4 rounded-full bg-foreground/[0.04] border border-foreground/10 text-xs sm:text-xs font-semibold text-foreground">
                <Compass className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Brand Audit</span>
              </div>
              <div className="inline-flex items-center gap-2 py-2 px-3.5 sm:py-2.5 sm:px-4 rounded-full bg-foreground/[0.04] border border-foreground/10 text-xs sm:text-xs font-semibold text-foreground">
                <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                <span>UX & Product</span>
              </div>
              <div className="inline-flex items-center gap-2 py-2 px-3.5 sm:py-2.5 sm:px-4 rounded-full bg-foreground/[0.04] border border-foreground/10 text-xs sm:text-xs font-semibold text-foreground">
                <Rocket className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Scale Roadmap</span>
              </div>
            </div>


            {/* Flow Button (Isolated Row with Magnetic Effect) */}
            <div className="w-full flex justify-center items-center pt-2">
              <Magnetic range={30}>
                <FlowButton
                  text="Book Now"
                  href="mailto:hello@prosmack.com?subject=1:1%20Brand%20%26%20Product%20Consulting%20Inquiry&body=Hi%20ProSmack%20Team%2C%0A%0AI%20would%20like%20to%20book%20a%201%3A1%20consulting%20session.%0A%0ABrand%20%2F%20Product%20Name%3A%20%0ACurrent%20Challenges%3A%20%0AGoals%3A%20%0A%0ALooking%20forward%20to%20connecting!"
                />
              </Magnetic>
            </div>

          </div>
        </div>

        {/* Direct Contacts Row */}
        <div className="w-full max-w-2xl mx-auto border-t border-foreground/10 pt-8 sm:pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-xs tracking-widest uppercase font-mono font-semibold text-secondary">
              Start a Conversation
            </span>
            <Magnetic range={25}>
              <a
                href="mailto:hello@prosmack.com"
                className="font-satoshi text-base font-bold text-foreground underline decoration-accent underline-offset-4 hover:text-accent transition-colors duration-300 py-1"
              >
                hello@prosmack.com
              </a>
            </Magnetic>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-xs tracking-widest uppercase font-mono font-semibold text-secondary">
              Call Direct
            </span>
            <Magnetic range={25}>
              <a
                href="tel:+15550199239"
                className="font-satoshi text-base font-bold text-foreground underline decoration-accent underline-offset-4 hover:text-accent transition-colors duration-300 py-1"
              >
                +1 (555) 019 9239
              </a>
            </Magnetic>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-xs tracking-widest uppercase font-mono font-semibold text-secondary">
              Studio Location
            </span>
            <span className="font-satoshi text-base font-bold text-foreground py-1">
              New York City / Remote
            </span>
          </div>
        </div>


      </div>
    </section>
  );
}
