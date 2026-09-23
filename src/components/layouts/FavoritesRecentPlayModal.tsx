"use client";

import { useState } from "react";
import { FaGamepad, FaHeart } from "react-icons/fa";
import { cn } from "@/utils/classNames";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

type TabId = "favorites" | "recent";

const EMPTY_MESSAGES: Record<TabId, string> = {
  favorites: "아직 즐겨찾기 게임이 없습니다.",
  recent: "최근 플레이한 게임 없음",
};

const TAB_ITEMS: {
  id: TabId;
  label: string;
  icon: typeof FaHeart;
}[] = [
    { id: "favorites", label: "즐겨찾기", icon: FaHeart },
    { id: "recent", label: "최근플레이", icon: FaGamepad },
  ];

function tabButtonClass(active: boolean) {
  return cn(
    "relative h-9 min-w-[120px] shrink-0 gap-2 rounded px-4 py-1.5 text-sm font-medium tracking-wide",
    active
      ? "border border-gold bg-gold text-[#000000de] hover:bg-gold hover:text-[#000000de]"
      : cn(
        "btn-elevated border border-gold bg-transparent text-gold",
        "shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f]",
        "hover:bg-transparent hover:text-gold",
      ),
  );
}

type FavoritesRecentPlayModalProps = {
  open: boolean;
  onClose: () => void;
};

export function FavoritesRecentPlayModal({
  open,
  onClose,
}: FavoritesRecentPlayModalProps) {
  const [tab, setTab] = useState<TabId>("favorites");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="즐겨찾기 & 최근플레이"
      className="lg:w-[720px] xl:w-[800px] 2xl:w-[1000px] w-full"
      contentClassName="flex min-h-[240px] flex-col"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {TAB_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <Button
                key={id}
                type="button"
                variant="transparent"
                ripple
                onClick={() => setTab(id)}
                leftIcon={
                  <Icon
                    className={cn(
                      "size-5 shrink-0",
                      active ? "text-[#000000de]" : "text-gold",
                    )}
                    aria-hidden
                  />
                }
                className={tabButtonClass(active)}
              >
                {label}
              </Button>
            );
          })}
        </div>

        <div className="flex min-h-[180px] flex-1 items-center justify-center">
          <p className="text-center text-sm text-white/90">
            {EMPTY_MESSAGES[tab]}
          </p>
        </div>
      </div>
    </Modal>
  );
}
