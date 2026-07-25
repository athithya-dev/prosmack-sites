'use client';

import React from 'react';
import { Sparkles, Briefcase, Compass, GitMerge, HelpCircle, Mail } from 'lucide-react';
import DockNav, { type DockNavItem } from '@/components/ui/dock-nav';

export default function DockNavbar() {
  const dockItems: DockNavItem[] = [
    {
      label: 'Services',
      href: '#services',
      icon: <Sparkles className="w-5 h-5 text-foreground" />,
    },
    {
      label: 'Featured Work',
      href: '#featured-work',
      icon: <Briefcase className="w-5 h-5 text-foreground" />,
    },
    {
      label: 'Philosophy',
      href: '#philosophy',
      icon: <Compass className="w-5 h-5 text-foreground" />,
    },
    {
      label: 'Process',
      href: '#process',
      icon: <GitMerge className="w-5 h-5 text-foreground" />,
    },
    {
      label: 'FAQs',
      href: '#faq',
      icon: <HelpCircle className="w-5 h-5 text-foreground" />,
    },
    {
      label: 'Contact',
      href: '#contact',
      icon: <Mail className="w-5 h-5 text-foreground" />,
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99] max-w-[95vw] sm:max-w-none">
      {/* Dock Backplate */}
      <div className="px-3 py-1.5 bg-surface/80 backdrop-blur-2xl border border-foreground/10 rounded-[2rem] shadow-[0_15px_30px_rgba(0,0,0,0.15)] flex items-center justify-center">
        <DockNav items={dockItems} align="center" className="h-12 flex items-center" />
      </div>
    </div>
  );
}
