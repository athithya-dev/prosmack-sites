"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn, getAssetPath } from "@/lib/utils";

export interface StaggerTestimonialItem {
  id: string;
  name: string;
  role: string;
  tag: string;
  testimonial: string;
  imgSrc: string;
}

export const prosmackTestimonials: StaggerTestimonialItem[] = [
  {
    id: "anjali",
    name: "Miss. Anjali Natarajan",
    role: "Founder of RedLabs",
    tag: "Volyah Brand Growth",
    testimonial:
      "When it comes to building a brand, Prosmack does an ideal job. On time delivery, professionalism and perfection. Client meetings are handled with proper research and strategy for the brand development. They have a set of hardworking and creative employees. I've found the best place for Volyah. I would strongly suggest Prosmack for your brand growth.",
    imgSrc: "/testimonials/anjali.png",
  },
  {
    id: "lakshmanan",
    name: "S P Lakshmanan",
    role: "Journalist",
    tag: "Media & Strategy",
    testimonial:
      "These guys have been really impressive. Good team, very prompt in responding to queries and respectful of time. They provide good ideas and they are very practical. They provide you with insights and suggestions that you otherwise wouldn’t think of. My experience has been fantastic!",
    imgSrc: "/testimonials/lakshmanan.png",
  },
  {
    id: "thenmozhi",
    name: "Thenmozhi",
    role: "Journalist",
    tag: "Project Reliability",
    testimonial:
      "Prosmack is one of the well recognised companies to ensure your project in the best possible way as you could ever expect. The professional expertise, they have, they execute and complete the project is way beyond description. Reliability is the key word for them.",
    imgSrc: "/testimonials/thenmozhi.png",
  },
  {
    id: "bhoopalm",
    name: "Bhoopalm",
    role: "Celebrity Photographer",
    tag: "Creative Direction",
    testimonial:
      "I highly recommend Prosmack. It completely fulfilled my criteria. Even if there were delays on my end, you guys were exceedingly patient. The pricing was reasonable, and all of our requests were satisfied. I would absolutely suggest you guys if someone asked me for anything comparable.",
    imgSrc: "/testimonials/bhoopalm.png",
  },
];

export const StaggerTestimonials: React.FC<{ items?: StaggerTestimonialItem[] }> = ({
  items = prosmackTestimonials,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(480);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setCardWidth(Math.min(window.innerWidth - 32, 340));
        } else if (window.innerWidth < 1024) {
          setCardWidth(420);
        } else {
          setCardWidth(480);
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = items.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
      {/* 3D Cards Stage */}
      <div className="relative w-full h-[440px] sm:h-[430px] md:h-[450px] flex items-center justify-center overflow-hidden">
        {items.map((testimonial, index) => {
          // Calculate circular distance from activeIndex
          let offset = index - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          // Compute horizontal translation
          const xOffset = isCenter ? 0 : offset > 0 ? cardWidth * 0.55 : -cardWidth * 0.55;

          return (
            <motion.div
              key={testimonial.id}
              onClick={() => handleCardClick(index)}
              initial={false}
              animate={{
                x: xOffset,
                y: isCenter ? 0 : 20,
                scale: isCenter ? 1 : 0.85,
                rotateZ: isCenter ? 0 : offset * 3,
                opacity: isCenter ? 1 : isVisible ? 0.45 : 0,
                zIndex: isCenter ? 20 : isVisible ? 10 : 0,
                pointerEvents: isVisible ? "auto" : "none",
              }}
              whileHover={isVisible ? { scale: isCenter ? 1.02 : 0.88, opacity: isCenter ? 1 : 0.7 } : {}}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 26,
              }}
              className={cn(
                "absolute cursor-pointer rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center justify-center select-none backdrop-blur-2xl transition-all duration-300 border",
                isCenter
                  ? "bg-gradient-to-br from-[#180a10] via-[#100c14] to-[#0a0a0f] border-accent/50 shadow-[0_20px_50px_rgba(234,13,35,0.25)] ring-1 ring-accent/30"
                  : "bg-[#111114]/90 text-white/60 border-white/10 shadow-2xl hover:border-white/20"
              )}
              style={{
                width: cardWidth,
                minHeight: 360,
              }}
            >
              {/* 1. Centered Top/Middle Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={getAssetPath(testimonial.imgSrc)}
                    alt={testimonial.name}
                    className={cn(
                      "w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 transition-all duration-300 mx-auto",
                      isCenter ? "border-accent shadow-[0_0_20px_rgba(234,13,35,0.45)] scale-105" : "border-white/20"
                    )}
                  />
                </div>

                {/* 2. Client Name below avatar */}
                <h4 className={cn(
                  "font-satoshi font-black text-lg sm:text-xl md:text-2xl tracking-tight leading-tight mt-3 text-center",
                  isCenter ? "text-white" : "text-white/80"
                )}>
                  {testimonial.name}
                </h4>

                {/* 3. Designation below name */}
                <div className="flex items-center justify-center gap-1.5 mt-1 text-center">
                  <span className={cn(
                    "font-mono text-xs sm:text-sm font-semibold",
                    isCenter ? "text-accent" : "text-secondary"
                  )}>
                    {testimonial.role}
                  </span>
                  {testimonial.tag && (
                    <>
                      <span className="text-xs text-white/30">•</span>
                      <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
                        {testimonial.tag}
                      </span>
                    </>
                  )}
                </div>

                {/* 4. 5 Stars below designation */}
                <div className="flex items-center justify-center gap-1.5 my-2.5 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-accent text-accent" />
                  ))}
                </div>
              </div>

              {/* 5. Description / Quote below stars */}
              <div className="my-auto px-2">
                <p className={cn(
                  "font-general-sans text-sm sm:text-base leading-relaxed text-center",
                  isCenter ? "text-white/95 font-normal" : "text-white/60 line-clamp-4"
                )}>
                  &ldquo;{testimonial.testimonial}&rdquo;
                </p>
              </div>
            </motion.div>

          );
        })}
      </div>

      {/* Navigation Controls & Pagination Dots */}
      <div className="flex items-center gap-4 mt-8 z-30">
        <button
          type="button"
          onClick={handlePrev}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#141414] border border-white/15 text-white hover:bg-accent hover:border-accent transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Indicator dots */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                i === activeIndex ? "w-6 bg-accent" : "w-2 bg-white/25 hover:bg-white/50"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#141414] border border-white/15 text-white hover:bg-accent hover:border-accent transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default StaggerTestimonials;
