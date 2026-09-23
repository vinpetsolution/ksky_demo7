"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/classNames";
import { AuthLink } from "@/components/ui/AuthLink";

const FOOTER_NAV = [
  // {
  //   label: "내 정보",
  //   href: "/my-page",
  //   icon: "/images/icons/icon_info.webp",
  // },
  {
    label: "충전",
    href: "/deposit",
    icon: "/images/icons/icon_deposit.webp",
  },
  {
    label: "환전",
    href: "/withdraw",
    icon: "/images/icons/icon_withdraw.webp",
  },
  // {
  //   label: "베팅내역",
  //   href: "/bet-history",
  //   icon: "/images/icons/icon_clock.webp",
  // },
  // {
  //   label: "문의하기",
  //   href: "/inquiries",
  //   icon: "/images/icons/icon_mail.webp",
  // },
] as const;

export function MobileFooterNav() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed right-0 bottom-0 left-0 z-55 w-full min-h-[62px]",
        "items-stretch justify-between bg-panel px-1.5 py-1.5",
        "rounded-t-xl border-t border-line",
        "shadow-[0_-6px_24px_rgba(90,70,30,0.12)]",
        "hidden max-lg:flex",
      )}
      aria-label="Mobile footer navigation"
    >
      {FOOTER_NAV.map((item) => {
        const active = pathname === item.href;

        return (
          <AuthLink
            key={item.href}
            href={item.href}
            className={cn(
              "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-lg px-0.5 py-1 no-underline",
              "transition-colors duration-200",
              active && "bg-[#F8F1E4]",
            )}
          >
            <span className="mx-auto flex min-w-0 flex-col items-center justify-center gap-[3px]">
              <span className="mx-auto flex size-[26px] items-center justify-center">
                <Image
                  unoptimized
                  src={item.icon}
                  alt=""
                  width={26}
                  height={26}
                  className="size-[26px] object-contain"
                />
              </span>
              <span
                className={cn(
                  "m-0 max-w-[72px] truncate text-center text-[10px] font-semibold leading-tight",
                  active ? "text-ink" : "text-gray",
                )}
              >
                {item.label}
              </span>
            </span>
          </AuthLink>
        );
      })}
    </nav>
  );
}
