'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronRight } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasCompletedRef = useRef(false);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    if (video) {
      tl.to(video, {
        opacity: 0,
        scale: 0.98,
        duration: 0.45,
        ease: 'power2.inOut',
      });
    }

    tl.to(
      container,
      {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut',
      },
      video ? '-=0.2' : 0
    );
  }, [onComplete]);

  // Handle video playback, metadata loading, and safe fallback timeouts
  useEffect(() => {
    // Initial generous fallback in case network completely stalls or video fails to load
    safetyTimerRef.current = setTimeout(() => {
      handleComplete();
    }, 20000);

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser strictly blocks un-gestured autoplay, give brief fallback window
          if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
          safetyTimerRef.current = setTimeout(() => {
            handleComplete();
          }, 3500);
        });
      }
    }

    return () => {
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
      }
    };
  }, [handleComplete]);

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const duration = e.currentTarget.duration;
    if (duration && !isNaN(duration) && duration > 0) {
      // Set safety timeout to slightly after the full video duration (e.g. duration + 3s buffer)
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        handleComplete();
      }, (duration + 3) * 1000);
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    // If video is within 0.15s of ending, trigger clean finish
    if (video.duration && video.currentTime >= video.duration - 0.15) {
      handleComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#050505] z-[99999] flex justify-center items-center select-none overflow-hidden"
    >
      {/* Edge-to-edge adaptive video player using native media query sources */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleComplete}
        onError={handleComplete}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src={getAssetPath("/mob-loader.mp4")} media="(max-width: 767px)" type="video/mp4" />
        <source src={getAssetPath("/preloader.mp4")} media="(min-width: 768px)" type="video/mp4" />
        <source src={getAssetPath("/preloader.mp4")} type="video/mp4" />
      </video>

      {/* Clean Skip Button for Both Mobile and Desktop */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 pointer-events-auto">
        <button
          type="button"
          onClick={handleComplete}
          className="flex items-center justify-center gap-2.5 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-black/80 hover:bg-[#ea0d23] text-white border border-white/30 hover:border-[#ea0d23] shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
          aria-label="Skip Intro Video"
        >
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase leading-none">
            Skip Intro
          </span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-white/90" />
        </button>
      </div>
    </div>
  );
}
