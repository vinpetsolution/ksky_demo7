"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/classNames";
import { AuthLink } from "@/components/ui/AuthLink";
import { SIDEBAR_NAV } from "./sidebarNav";

const menuItemClassName = cn(
  "relative group inline-flex overflow-hidden no-underline transition-all duration-250 ease-in-out",
  "rounded-[10px] border border-white/[0.07] bg-white/[0.055] text-[#ffffffd9]",
  "shadow-[inset_0_1px_#ffffff0a]",
  // shared hover
  "hover:border-[rgba(128,101,40,0.22)]",
  "hover:bg-[linear-gradient(90deg,#c9a2272e,#c9a2270d)]",
  "hover:shadow-[0_8px_24px_-12px_#c9a22766,inset_0_1px_#ffffff0d]",
  // mobile: size / layout only
  "max-lg:h-[75px] max-lg:max-h-[60px] max-lg:w-[68px] max-lg:flex-none max-lg:flex-col",
  "max-lg:items-center max-lg:justify-center max-lg:gap-0.5 max-lg:px-1.5 max-lg:py-1",
  "max-lg:hover:translate-x-0 max-lg:before:hidden",
  // desktop: row layout + accent bar
  "lg:h-[52px] lg:max-h-14 lg:w-full lg:items-center lg:justify-start lg:gap-2.5 lg:px-3 lg:py-1.5",
  "lg:before:absolute lg:before:top-1/2 lg:before:left-0 lg:before:h-0 lg:before:w-[3px] lg:before:-translate-y-1/2",
  "lg:before:rounded-r lg:before:bg-[linear-gradient(180deg,#d8b24a,var(--color-gold))]",
  "lg:before:transition-[height] lg:before:duration-250 lg:before:ease-in-out lg:before:content-['']",
  "lg:hover:translate-x-[3px] lg:hover:before:h-[58%]",
);

const menuItemActiveClassName = cn(
  "border-[rgba(128,101,40,0.22)]",
  // mobile active
  "max-lg:bg-[linear-gradient(180deg,#c9a22729,#c9a2270d)]",
  "max-lg:shadow-[0_4px_16px_-8px_#c9a22759]",
  // desktop (lg+) active
  "lg:translate-x-[3px] lg:before:h-[58%]",
  "lg:bg-[linear-gradient(90deg,#c9a2272e,#c9a2270d)]",
  "lg:shadow-[0_8px_24px_-12px_#c9a22766,inset_0_1px_#ffffff0d]",
);

export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "z-40 flex w-full max-w-full flex-col",
        "bg-[linear-gradient(180deg,#0c1016_0%,#070a0f_100%)]",
        // mobile: in-flow horizontal bar
        "relative shadow-none",
        // top glow
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-2 before:h-[0.5px] before:content-['']",
        "before:bg-[linear-gradient(90deg,transparent_0%,rgba(255,238,175,0.32)_20%,rgba(255,248,210,0.58)_50%,rgba(255,238,175,0.32)_80%,transparent_100%)]",
        "before:shadow-[0_0_8px_rgba(255,245,195,0.32),0_0_2px_rgba(255,252,220,0.22)]",
        // bottom glow (mobile)
        "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-2 after:h-[0.5px] after:content-['']",
        "after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,238,175,0.32)_20%,rgba(255,248,210,0.58)_50%,rgba(255,238,175,0.32)_80%,transparent_100%)]",
        "after:shadow-[0_0_8px_rgba(255,245,195,0.32),0_0_2px_rgba(255,252,220,0.22)]",
        // desktop: fixed vertical sidebar
        "lg:fixed lg:top-20 lg:left-0 lg:h-[calc(100%-80px)] lg:w-60 lg:items-center lg:justify-start",
        "lg:bg-[linear-gradient(180deg,#0c1016_0%,#070a0f_62%,#000_100%)]",
        "lg:shadow-[16px_0_48px_-10px_rgba(0,0,0,0.82)] lg:duration-200",
        // desktop right glow overrides bottom glow
        "lg:after:inset-x-auto lg:after:top-0 lg:after:right-0 lg:after:bottom-auto lg:after:h-full lg:after:w-[0.5px]",
        "lg:after:bg-[linear-gradient(180deg,transparent_0%,rgba(255,238,175,0.28)_20%,rgba(255,248,210,0.52)_50%,rgba(255,238,175,0.28)_80%,transparent_100%)]",
        "lg:after:shadow-[0_0_8px_rgba(255,245,195,0.32),0_0_2px_rgba(255,252,220,0.22)]",
      )}
    >
      <div
        className={cn(
          "relative w-full",
          "max-lg:overflow-x-auto max-lg:overflow-y-hidden max-lg:shadow-[0_4px_16px_-8px_#0009]",
          "max-lg:[scrollbar-width:thin] max-lg:[scrollbar-color:#c9a227_transparent]",
          "lg:h-full lg:overflow-y-auto lg:overflow-x-hidden",
        )}
      >
        <nav
          className={cn(
            "flex",
            "max-lg:w-max max-lg:min-w-full max-lg:flex-row max-lg:flex-nowrap max-lg:gap-2.5 max-lg:px-2 max-lg:py-3",
            "lg:w-full lg:flex-col lg:gap-2 lg:px-4 lg:py-4",
          )}
        >
          {SIDEBAR_NAV.map((item) => {
            const active = item.href !== "#" && pathname === item.href;

            return (
              <AuthLink
                key={item.label}
                href={item.href}
                requireAuth={item.requireAuth ?? true}
                className={cn(menuItemClassName, active && menuItemActiveClassName)}
              >
                <Image
                  unoptimized
                  src={item.icon}
                  alt=""
                  width={30}
                  height={30}
                  className={cn(
                    "relative z-1 shrink-0 object-contain transition-all duration-300 group-hover:scale-110",
                    "max-lg:size-[32px]",
                    "lg:size-[30px]",
                  )}
                />
                <span
                  className={cn(
                    "relative z-1 whitespace-nowrap text-white",
                    "max-lg:text-[11px]",
                    "lg:text-base",
                    active ? "text-gold-soft" : "text-white",
                  )}
                >
                  {item.label}
                </span>
              </AuthLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
