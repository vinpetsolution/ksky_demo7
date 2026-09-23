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
          "rounded-b-[14px] border-t-0 text-sm font-semibold text-ink",
          "bg-linear-to-b from-panel-elevated to-panel",
          "shadow-[0_6px_16px_-10px_rgba(90,70,30,0.12)]",
          "transition-[transform,background,box-shadow] duration-250 ease-in-out",
          "group-hover:bg-[linear-gradient(180deg,#c6a15b2e,#c6a15b08)]",
          "group-hover:shadow-[0_12px_24px_-14px_#c6a15b80]",
          isActive && "-translate-y-0.5 border-gold-border bg-[linear-gradient(180deg,#c6a15b2e,#c6a15b08)]",
        )}
      >
        <span className="whitespace-nowrap">더보기 +</span>
      </span>

      <ul
        className={cn(
          "absolute left-1/2 top-full z-50 min-w-[180px] -translate-x-1/2 pt-1",
          "overflow-hidden rounded-b-lg border border-line bg-white shadow-[0_8px_20px_rgba(90,70,30,0.12)]",
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
                "block whitespace-nowrap px-5 py-3 text-sm font-semibold text-ink",
                "bg-white transition-colors duration-200",
                "hover:bg-[#F8F1E4] hover:text-gold-deep",
                pathname === item.href && "bg-cream text-gold-deep",
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
