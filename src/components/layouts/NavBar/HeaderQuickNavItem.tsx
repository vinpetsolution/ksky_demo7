"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/utils/classNames";
import { AuthLink } from "@/components/ui/AuthLink";
import { useRipple } from "@/hooks/useRipple";
import type { HeaderQuickNavItem as HeaderQuickNavItemType } from "./headerQuickNav";
import Image from "next/image";

type Props = {
  item: HeaderQuickNavItemType;
};

export function HeaderQuickNavItem({ item }: Props) {
  const pathname = usePathname();
  const { waves, handlePointerDown, removeWave } = useRipple();
  const active = item.href !== "#" && pathname === item.href;

  return (
    <AuthLink
      href={item.href}
      requireAuth={item.requireAuth ?? true}
      onPointerDown={handlePointerDown}
      data-active={active ? true : undefined}
      className={cn(
        "group ripple relative z-5 flex h-20 w-14 xl:min-w-24 flex-col items-center justify-center gap-2",
        "overflow-hidden rounded-b-[14px] border-t-0",
        "bg-linear-to-b from-[#181d25] to-panel px-4 pt-3 pb-3.5 text-sm font-semibold text-white",
        "shadow-[0_6px_16px_-10px_#000000b3]",
        "transition-[transform,background,box-shadow,border-color] duration-250 ease-in-out",
        // underline ::after
        "after:pointer-events-none after:absolute after:bottom-[7px] after:left-1/2 after:z-1",
        "after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-sm after:bg-gold",
        "after:transition-[width] after:duration-250 after:content-['']",
        // hover
        "hover:bg-[linear-gradient(180deg,#c9a2272e,#c9a22708)]",
        "hover:shadow-[0_12px_24px_-14px_#c9a22780]",
        "hover:after:w-11",
        // active (route khớp)
        "data-active:-translate-y-0.5 data-active:border-gold-border",
        "data-active:bg-[linear-gradient(180deg,#c9a2272e,#c9a22708)]",
        "data-active:shadow-[0_12px_24px_-14px_#c9a22780]",
        "data-active:after:w-11",
      )}
    >
      {waves.map((wave) => (
        <span
          key={wave.id}
          className="ripple-wave"
          style={{
            left: wave.x,
            top: wave.y,
            width: wave.size,
            height: wave.size,
          }}
          onAnimationEnd={() => removeWave(wave.id)}
          aria-hidden
        />
      ))}
      <Image
        unoptimized
        src={item.icon}
        alt=""
        width={30}
        height={30}
        className="relative z-10 size-[30px] shrink-0 object-contain transition-all group-hover:translate-y-[-2px] duration-300 group-hover:scale-110"
      />
      <span className="relative z-10 whitespace-nowrap group-hover:translate-y-[-2px] transition-all duration-300">{item.label}</span>
    </AuthLink>
  );
}
