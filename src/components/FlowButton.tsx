'use client';

import React, { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  className?: string;
  variant?: 'accent' | 'monochrome';
}

export const FlowButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, FlowButtonProps>(
  ({ text = 'Book Now', href, className = '', variant = 'accent', onClick, ...props }, ref) => {
    const isAccent = variant === 'accent';

    const pill = (
      <span
        className={[
          'group relative inline-flex items-center justify-center',
          'h-14 min-w-[220px] px-10',
          'overflow-hidden rounded-full',
          'border border-foreground/20 bg-foreground/[0.04] backdrop-blur-md',
          'text-foreground font-satoshi font-bold uppercase tracking-widest text-xs sm:text-sm',
          'cursor-pointer select-none',
          'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
          'hover:border-transparent hover:text-white hover:rounded-2xl',
          isAccent
            ? 'hover:shadow-[0_10px_35px_rgba(234,13,35,0.45)]'
            : 'hover:shadow-[0_10px_35px_rgba(0,0,0,0.35)]',
          'active:scale-[0.97]',
          className,
        ].join(' ')}
      >
        {/* Left arrow: hidden left, slides in & fades in on hover */}
        <ArrowRight
          aria-hidden="true"
          className="absolute left-[-20px] opacity-0 w-4 h-4 stroke-[2.5] text-foreground group-hover:left-5 group-hover:opacity-100 group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none z-20"
        />

        {/* Text: perfectly centered, shifts subtly on hover */}
        <span className="relative z-20 px-2 transition-transform duration-500 ease-out group-hover:translate-x-2.5">
          {text}
        </span>

        {/* Right arrow: visible at rest, slides right & fades out on hover */}
        <ArrowRight
          aria-hidden="true"
          className="absolute right-5 opacity-100 w-4 h-4 stroke-[2.5] text-foreground group-hover:right-[-20px] group-hover:opacity-0 group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none z-20"
        />

        {/* Expanding circle backdrop: strictly contained by overflow-hidden */}
        <span
          aria-hidden="true"
          className={[
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-2 h-2 rounded-full opacity-0 pointer-events-none z-10',
            'group-hover:w-[420px] group-hover:h-[420px] group-hover:opacity-100',
            'transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]',
            isAccent ? 'bg-accent' : 'bg-foreground',
          ].join(' ')}
        />
      </span>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          onClick={onClick as any}
          className="inline-flex justify-center items-center outline-none"
        >
          {pill}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        className="inline-flex justify-center items-center outline-none bg-transparent border-0 p-0"
        {...props}
      >
        {pill}
      </button>
    );
  }
);

FlowButton.displayName = 'FlowButton';

export default FlowButton;
