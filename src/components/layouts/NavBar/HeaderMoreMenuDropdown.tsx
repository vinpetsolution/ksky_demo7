"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/utils/classNames";
import { AuthLink } from "@/components/ui/AuthLink";

export interface HeaderMoreMenuItem {
  label: string;
  href: string;
  requireAuth?: boolean;
}

export const HEADER_MORE_MENU: HeaderMoreMenuItem[] = [
  {
    label: "에이전트 배팅 랭킹",
    href: "/agent-ranking",
  },
  {
    label: "유저 배팅 랭킹",
    href: "/user-ranking",
  },
];

export function HeaderMoreMenuDropdown() {
  const pathname = usePathname();
  const isActive = HEADER_MORE_MENU.some((item) => pathname === item.href);

  return (
    <li className="group relative flex h-20 items-center">
      <span
        className={cn(
          "flex h-20 cursor-default flex-col items-center justify-center gap-2 px-4 pt-3 pb-3.5",
          "rounded-b-[14px] border-t-0 text-sm font-semibold text-white",
          "bg-linear-to-b from-[#181d25] to-panel",
          "shadow-[0_6px_16px_-10px_#000000b3]",
          "transition-[transform,background,box-shadow] duration-250 ease-in-out",
          "group-hover:bg-[linear-gradient(180deg,#c9a2272e,#c9a22708)]",
          "group-hover:shadow-[0_12px_24px_-14px_#c9a22780]",
          isActive && "-translate-y-0.5 border-gold-border bg-[linear-gradient(180deg,#c9a2272e,#c9a22708)]",
        )}
      >
        <span className="whitespace-nowrap">더보기 +</span>
      </span>

      <ul
        className={cn(
          "absolute left-1/2 top-full z-50 min-w-[180px] -translate-x-1/2 pt-1",
          "invisible opacity-0 transition-opacity duration-200",
          "group-hover:visible group-hover:opacity-100",
        )}
      >
        {HEADER_MORE_MENU.map((item) => (
          <li key={item.href}>
            <AuthLink
              href={item.href}
              requireAuth={item.requireAuth ?? true}
              className={cn(
                "block whitespace-nowrap px-5 py-3 text-sm font-semibold text-white",
                "bg-[linear-gradient(180deg,#d8b24a,#5a3c0e)]",
                "transition-[filter] duration-200 hover:brightness-110",
                pathname === item.href && "ring-1 ring-inset ring-white/30",
              )}
            >
              {item.label}
            </AuthLink>
          </li>
        ))}
      </ul>
    </li>
  );
}
