export interface HeaderQuickNavItem {
  label: string;
  href: string;
  icon: string;
  requireAuth?: boolean;
}

export const HEADER_QUICK_NAV: HeaderQuickNavItem[] = [
  {
    label: "공지사항",
    href: "/announcement",
    icon: "/images/icons/icon_annouce.webp",
    requireAuth: true,
  },
  {
    label: "문의하기",
    href: "/inquiries",
    icon: "/images/icons/icon_mail.webp",
  },
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
  //   label: "정보",
  //   href: "/my-page",
  //   icon: "/images/icons/icon_info.webp",
  // },
  // {
  //   label: "베팅내역",
  //   href: "/bet-history",
  //   icon: "/images/icons/icon_clock.webp",
  // },
];
