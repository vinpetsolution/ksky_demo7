"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/classNames";
import { getSlotFallbackLogoUrl, getSlotLogoUrl } from "@/utils/vendorImages";

const MAINTENANCE_RIBBON = "/images/icons/icon_slot.webp";

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

const CARD_BG = [
  "from-background to-[#f8f1e4]",
  "from-panel to-[#f8f1e4]",
  "from-panel to-line",
  "from-cream to-panel",
];

export interface GameSlotCardProps {
  title: string;
  slug: string;
  slotIndex?: number;
  isMaintenance?: boolean;
  href?: string;
  className?: string;
}

export function GameSlotCard({
  title,
  slug,
  isMaintenance = false,
  href,
  className,
}: GameSlotCardProps) {
  const logo = getSlotLogoUrl(slug);
  const bgClass = CARD_BG[hash(`${title}-${slug}`) % CARD_BG.length];

  const content = (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden bg-panel",
        "border border-gold-border transition-colors duration-200",
        href && "hover:border-[#a6842e]",
        className
      )}
    >
      <div className={cn("relative w-full shrink-0 overflow-hidden aspect-400/254 bg-gradient-to-br", bgClass)}>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <Image
            src={logo}
            alt={title}
            width={280}
            height={140}
            className="max-h-[70%] w-auto object-contain transition-all duration-300 group-hover:scale-105"
            sizes="(max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
            onError={(e) => {
              e.currentTarget.src = getSlotFallbackLogoUrl();
            }}
          />
        </div>

        <div className="absolute left-2 top-2 z-20 h-10 w-20 md:left-3 md:top-3 md:h-12 md:w-24">
          <Image
            src={logo}
            alt=""
            fill
            className="object-contain animate-beat opacity-90"
            sizes="96px"
          />
        </div>

        <span className="casino_text absolute bottom-[8%] left-1/2 z-20 -translate-x-1/2 w-full px-[4%] text-center text-[clamp(0.75rem,2.5vw,1rem)] animate-beat">
          {title}
        </span>

        {isMaintenance && (
          <div className="absolute right-2 top-2 z-30 h-8 w-8 shrink-0 md:h-10 md:w-10">
            <Image
              src={MAINTENANCE_RIBBON}
              alt="점검"
              width={40}
              height={40}
              className="h-full w-full object-contain opacity-80"
            />
          </div>
        )}
      </div>

      <div className="game-slot-card-footer relative flex min-h-10 shrink-0 items-center border-t border-[#f8f1e4] px-[4%] py-2">
        <span className="game-slot-card-title text-[clamp(0.75rem,2.5vw,1rem)] font-semibold">
          {title}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
