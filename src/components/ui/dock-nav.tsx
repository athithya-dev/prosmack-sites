"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { type ComponentPropsWithoutRef, type ReactNode, useState } from "react";

const DOCK_EASE = [0.16, 1, 0.3, 1] as const;
const DOCK_DURATION = 0.5;

const DOCK_WIDTH = {
  base: "2.65rem",
  far: "3.5rem",
  close: "4.35rem",
  active: "5.25rem",
} as const;


const dockNavVariants = cva("w-full", {
  variants: {
    align: {
      center: "",
      start: "",
      end: "",
    },
  },
  defaultVariants: {
    align: "center",
  },
});

const dockNavListVariants = cva(
  "mb-0 flex list-none flex-row items-end justify-center p-0 text-[clamp(0.875rem,1.4vw,1.125rem)]",
  {
    variants: {
      align: {
        center: "justify-center",
        start: "justify-start",
        end: "justify-end",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
);

const dockNavItemVariants = cva("relative flex items-center justify-center");

const dockNavLinkVariants = cva(
  "relative z-[1] flex h-full w-full items-center justify-center px-[0.5em] py-0"
);

const dockNavIconVariants = cva("h-full w-full flex items-center justify-center");

const dockNavTooltipVariants = cva(
  "pointer-events-none absolute top-0 z-0 whitespace-nowrap rounded-[0.25em] bg-surface border border-foreground/10 px-[0.6em] py-[0.4em] font-medium text-[0.75rem] text-foreground shadow-xl"
);

function getItemWidth(index: number, hoveredIndex: number | null) {
  if (hoveredIndex === null) {
    return DOCK_WIDTH.base;
  }

  const distance = Math.abs(index - hoveredIndex);

  if (distance === 0) {
    return DOCK_WIDTH.active;
  }

  if (distance === 1) {
    return DOCK_WIDTH.close;
  }

  if (distance === 2) {
    return DOCK_WIDTH.far;
  }

  return DOCK_WIDTH.base;
}

export interface DockNavItem {
  /** Accessible label for the icon image. */
  alt?: string;
  /** Link destination. */
  href?: string;
  /** Custom icon node. Used when `iconSrc` is not provided. */
  icon?: ReactNode;
  /** Remote or local image URL for the dock icon. */
  iconSrc?: string;
  /** Visible tooltip label. */
  label: string;
}

export interface DockNavProps
  extends Omit<ComponentPropsWithoutRef<"nav">, "children">,
    VariantProps<typeof dockNavVariants> {
  /** Animation duration in seconds. */
  duration?: number;
  /** Dock entries rendered left to right. */
  items: DockNavItem[];
}

function DockNavItemIcon({
  alt,
  icon,
  iconSrc,
  label,
}: Pick<DockNavItem, "alt" | "icon" | "iconSrc" | "label">) {
  if (icon) {
    return <span className={dockNavIconVariants()}>{icon}</span>;
  }

  if (iconSrc) {
    return (
      <Image
        alt={alt ?? label}
        className={dockNavIconVariants()}
        height={64}
        src={iconSrc}
        width={64}
        style={{ width: "auto", height: "auto" }}
      />
    );
  }

  return null;
}

function DockNav({
  align = "center",
  className,
  duration = DOCK_DURATION,
  items,
  ...props
}: DockNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration,
        ease: DOCK_EASE,
      };

  return (
    <nav className={cn(dockNavVariants({ align, className }))} {...props}>
      <ul className={dockNavListVariants({ align })}>
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const itemKey = `${item.label}-${item.href ?? index}`;

          return (
            <motion.li
              animate={{ width: getItemWidth(index, hoveredIndex) }}
              className={dockNavItemVariants()}
              initial={false}
              key={itemKey}
              onMouseEnter={() => {
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
              }}
              transition={transition}
            >
              <a
                className={dockNavLinkVariants()}
                href={item.href ?? "#"}
                onClick={(event) => {
                  if (!item.href) {
                    event.preventDefault();
                  } else if (item.href.startsWith("#")) {
                    event.preventDefault();
                    const targetId = item.href.slice(1);
                    const element = document.getElementById(targetId);
                    if (element) {
                      const lenis = (window as any).lenis;
                      if (lenis) {
                        lenis.scrollTo(element, { offset: -80, duration: 1.5 });
                      } else {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }
                }}
              >
                <DockNavItemIcon
                  alt={item.alt}
                  icon={item.icon}
                  iconSrc={item.iconSrc}
                  label={item.label}
                />
              </a>
              <motion.div
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? "-150%" : "-80%",
                }}
                className={dockNavTooltipVariants()}
                initial={false}
                transition={transition}
              >
                <div>{item.label}</div>
              </motion.div>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}

export {
  DockNav,
  dockNavIconVariants,
  dockNavItemVariants,
  dockNavLinkVariants,
  dockNavListVariants,
  dockNavTooltipVariants,
  dockNavVariants,
};

export default DockNav;
