"use client";

import { useState } from "react";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/Button";
import { GameSearchModal } from "@/components/slot/GameSearchModal";
import { cn } from "@/utils/classNames";

export function SlotPageHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center justify-start gap-1 lg:gap-5">
          <div className="flex size-[35px] items-center justify-center overflow-hidden lg:size-[50px]">
            <Image
              unoptimized
              src="/images/icons/icon_slot.webp"
              alt="logo"
              width={50}
              height={50}
              className="h-full w-full object-contain"
            />
          </div>
          <h3 className="text-base font-semibold lg:text-3xl">슬롯</h3>
        </div>

        <Button
          variant="transparent"
          ripple
          onClick={() => setSearchOpen(true)}
          className={cn(
            "flex h-7 w-max items-center justify-center rounded-sm bg-gold px-2.5 text-xs font-semibold text-ink lg:h-8 lg:text-sm",
            "shadow-[0_3px_1px_-2px_#5a461e14,0_2px_2px_#5a461e1a,0_1px_5px_#5a461e14]",
          )}
          leftIcon={<IoSearch className="size-4 shrink-0 lg:size-5" />}
        >
          검색
        </Button>
      </div>

      <GameSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
