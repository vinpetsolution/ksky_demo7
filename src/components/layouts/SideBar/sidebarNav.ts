export interface SidebarNavItem {
  label: string;
  href: string;
  icon: string;
  requireAuth?: boolean;
}

export const SIDEBAR_NAV: SidebarNavItem[] = [
  {
    label: "카지노",
    href: "/game_casino",
    icon: "/images/icons/icon_casino.webp",
    requireAuth: true,
  },
  {
    label: "슬롯",
    href: "/game_slot",
    icon: "/images/icons/icon_slot.webp",
    requireAuth: true,
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
  //   label: "포인트전환",
  //   href: "/points",
  //   icon: "/images/icons/icon_clock.webp",
  // },
  // {
  //   label: "베팅내역",
  //   href: "/bet-history",
  //   icon: "/images/icons/icon_clock.webp",
  // },
  {
    label: "공지사항",
    href: "/announcement",
    icon: "/images/icons/icon_annouce.webp",
    requireAuth: true,
  },
  {
    label: "고객센터",
    href: "/inquiries",
    icon: "/images/icons/icon_news.webp",
  },
  {
    label: "쪽지",
    href: "/messages",
    icon: "/images/icons/icon_chatting.webp",
  },
  {
    label: "에이전트 배팅 랭킹",
    href: "/agent-ranking",
    icon: "/images/icons/icon_clock.webp",
  },
  {
    label: "유저 배팅 랭킹",
    href: "/user-ranking",
    icon: "/images/icons/icon_clock.webp",
  },
];
