export type MobileSidebarQuickActionId = "account" | "deposit" | "favorites";

export interface MobileSidebarQuickAction {
  id: MobileSidebarQuickActionId;
  label: string;
  variant?: "default" | "gold-border";
}

export const MOBILE_SIDEBAR_QUICK_ACTIONS: MobileSidebarQuickAction[] = [
  // { id: "account", label: "나의 계정" },
  { id: "deposit", label: "충전", variant: "gold-border" },
  { id: "favorites", label: "즐겨찾기 & 최근플레이" },
];

/** Nhãn hiển thị mobile (mock dùng 베팅내역). */
export function mobileSidebarNavLabel(label: string): string {
  return label === "배팅내역" ? "베팅내역" : label;
}
