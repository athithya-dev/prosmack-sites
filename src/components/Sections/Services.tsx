'use client';

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Target, Palette, Megaphone, Share2, Video, Sparkles } from "lucide-react";

const servicesList = [
  {
    title: "Brand Strategy",
    description: "Align your identity, identify market gaps, and lock in positioning with military-grade precision.",
    image: "/services_strategy.jpg",
    icon: Target,
  },
  {
    title: "Branding & Identity",
    description: "Bespoke design, luxury typography systems, and identity frameworks that project authority.",
    image: "/services_branding.jpg",
    icon: Palette,
  },
  {
    title: "Campaign Advertising",
    description: "Multi-channel media planning, custom design, and ROI-driven ad funnels built to convert.",
    image: "/services_advertising.jpg",
    icon: Megaphone,
  },
  {
    title: "Social Growth",
    description: "Viral-ready social content pipelines, interactive media, and data-driven audience engagement.",
    image: "/services_social.jpg",
    icon: Share2,
  },
  {
    title: "Cinematic Video",
    description: "Full-suite commercial video production, premium color grading, and anamorphic 4K visuals.",
    image: "/services_video.jpg",
    icon: Video,
  },
  {
    title: "Partner with Us",
    description: "Ready to scale your influence? Let's engineer market authority and brand gravity together.",
    image: "/philosophy_portrait.jpg",
    icon: Sparkles,
    isCTA: true,
  },
];

export default function Services() {
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -80, duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="services"
      className="w-full bg-background flex items-center justify-center overflow-hidden border-t border-white/5 py-12 md:py-24 relative z-20"
    >
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center justify-center text-center px-4 mb-4 md:mb-8">
            <span className="text-accent font-satoshi text-xs md:text-sm tracking-[0.4em] uppercase font-bold block mb-3">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase text-foreground tracking-tight leading-none mb-4 md:mb-6">
              Our Creative Services <br />
              <span className="text-accent text-4xl md:text-7xl lg:text-8xl mt-2 block font-extrabold">
                Command Gravity
              </span>
            </h2>
          </div>
        }
      >
        <div className="h-full w-full bg-surface p-3 md:p-6 rounded-2xl md:overflow-y-auto scrollbar-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 h-full">
            {servicesList.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className={`relative group overflow-hidden rounded-xl border border-white/5 bg-card/60 flex flex-col justify-start transition-all duration-500 hover:border-accent/40 w-full h-full min-h-[200px] sm:min-h-0 ${
                    service.isCTA ? 'bg-accent/5 border-accent/20' : ''
                  }`}
                >
                  {/* Background image */}
                  <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/40 z-10" />
                  </div>

                  {/* Content Wrapper with padding inside to guarantee alignment and prevent clipping */}
                  <div className="relative z-20 flex flex-col gap-4 w-full h-full justify-start items-start text-left p-6 md:p-8">
                    {/* Clean icon aligned directly with the text left border */}
                    <div className="text-accent group-hover:text-foreground transition-colors duration-300">
                      <Icon size={28} />
                    </div>

                    <div className="flex flex-col gap-2 w-full mt-1">
                      <h3 className="font-satoshi font-black text-base md:text-lg uppercase tracking-wider text-white select-none">
                        {service.title}
                      </h3>
                      <p className="text-[12px] md:text-sm text-white/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300 select-none">
                        {service.description}
                      </p>
                    </div>

                    {service.isCTA && (
                      <div className="mt-auto pt-4">
                        <a
                          href="#contact"
                          onClick={handleCTAClick}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-white hover:text-black text-foreground font-satoshi text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer"
                        >
                          Get Started →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
