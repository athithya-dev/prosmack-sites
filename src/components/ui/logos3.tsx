"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getAssetPath } from "@/lib/utils";

export interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

export interface Logos3Props {
  heading?: string;
  subheading?: string;
  logos?: Logo[];
  className?: string;
}

export const defaultLogos: Logo[] = [
  {
    id: "kms-hakkim",
    description: "KMS Hakkim Kalyana Biriyani",
    image: "/clients/kms_hakkim.png",
    className: "h-14 sm:h-16 w-auto object-contain brightness-110 contrast-125",
  },
  {
    id: "homepreneur",
    description: "Homepreneur Awards",
    image: "/clients/homepreneur_dark.png",
    className: "h-12 sm:h-14 w-auto object-contain",
  },
  {
    id: "st-brittos",
    description: "St. Britto's Academy",
    image: "/clients/st_brittos_dark.png",
    className: "h-12 sm:h-14 w-auto object-contain",
  },
  {
    id: "aiboc",
    description: "AIBOC",
    image: "/clients/aiboc_dark.png",
    className: "h-12 sm:h-14 w-auto object-contain",
  },
  {
    id: "sayara",
    description: "Sayara Herbal Beauty Care",
    image: "/clients/sayara_dark.png",
    className: "h-10 sm:h-12 w-auto object-contain",
  },
];

const Logos3 = ({
  heading = "Brands & Partners We've Powered",
  subheading = "Trusted by leaders across gastronomy, education, corporate institutions, and luxury D2C",
  logos = defaultLogos,
  className = "",
}: Logos3Props) => {
  return (
    <section className={`py-20 md:py-28 bg-[#050505] text-white overflow-hidden relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase">
            Client Network
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-satoshi uppercase tracking-tight text-white leading-tight">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-3 text-xs sm:text-sm text-secondary font-mono max-w-xl">
            {subheading}
          </p>
        )}
      </div>

      <div className="pt-10 md:pt-14">
        <div className="relative mx-auto flex items-center justify-center max-w-6xl px-4">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              AutoScroll({
                speed: 1.2,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full select-none"
          >
            <CarouselContent className="ml-0 items-center">
              {logos.concat(logos).map((logo, idx) => (
                <CarouselItem
                  key={`${logo.id}-${idx}`}
                  className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="mx-6 sm:mx-8 flex shrink-0 items-center justify-center p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/40 hover:bg-white/[0.04] transition-all duration-300 group">
                    <img
                      src={getAssetPath(logo.image)}
                      alt={logo.description}
                      className={`${logo.className} filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-75 group-hover:opacity-100 group-hover:scale-105`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Subtle gradient edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
export default Logos3;
