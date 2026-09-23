"use client";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { BANNER_VIDEOS, CASINO_HOME_DATA, SLOT_DATA } from "@/mocks/slides";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { AuthLink } from "@/components/ui/AuthLink";
import { cn } from "@/utils/classNames";
import { GameCard } from "@/components/ui/GameCard";

export default function Home() {
  return (
    <div className="lg:px-3.5 pb-10">
      <HeroCarousel videos={BANNER_VIDEOS} />
      <div className="flex flex-col gap-3 lg:gap-5 mt-2.5 lg:mt-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-1 lg:gap-5 justify-start">
            <div className="size-8.75 lg:size-12.5 flex items-center justify-center overflow-hidden">
              <Image
                unoptimized
                src="/images/icons/icon_casino.webp"
                alt="logo"
                width={50}
                height={50}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-base lg:text-3xl font-semibold ">카지노</h3>
          </div>
          <AuthLink href="/game_casino">
            <Button
              variant="transparent"
              ripple
              className={cn("rounded-sm w-max h-7 lg:h-8 bg-gold font-semibold px-2.5 text-xs lg:text-sm text-[#101010] flex items-center justify-center ",
                "shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f]"
              )}
            >
              더보기
            </Button>
          </AuthLink>

        </div>
        <div className="grid grid-cols-12 gap-3 lg:gap-6">
          <div className="col-span-12 lg:col-span-4">
            {CASINO_HOME_DATA.slice(0, 1).map((video, i) => (
              <GameCard key={video.name ?? video.video ?? i} {...video}
                className="w-full aspect-video"
              />
            ))}
          </div>
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {CASINO_HOME_DATA.slice(1, 9).map((video, i) => (
              <GameCard key={video.name ?? video.video ?? i + 1} {...video}
                className="w-full aspect-video"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 lg:gap-5 mt-2.5 lg:mt-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-1 lg:gap-5 justify-start">
            <div className="size-8.75 lg:size-12.5 flex items-center justify-center overflow-hidden">
              <Image
                unoptimized
                src="/images/icons/icon_slot.webp"
                alt="logo"
                width={50}
                height={50}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-base lg:text-3xl font-semibold ">슬롯</h3>
          </div>
          <AuthLink href="/game_slot">
            <Button
              variant="transparent"
              ripple
              className={cn("rounded-sm w-max h-7 lg:h-8 bg-gold font-semibold px-2.5 text-xs lg:text-sm text-[#101010] flex items-center justify-center ",
                "shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f]"
              )}
            >
              더보기
            </Button>
          </AuthLink>

        </div>
        <div className="grid grid-cols-12 gap-3 lg:gap-6">
          <div className="col-span-12 lg:col-span-4">
            {SLOT_DATA.slice(0, 1).map((item, i) => (
              <GameCard key={item.name ?? item.image ?? i} {...item}
                className="w-full aspect-video"
              />
            ))}
          </div>
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {SLOT_DATA.slice(1, 9).map((item, i) => (
              <GameCard key={item.name ?? item.image ?? i + 1} {...item}
                className="w-full aspect-video"
              />
            ))}
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 gap-4 px-6 py-10 md:grid-cols-3 lg:grid-cols-5">
        {CASINO_CARDS.slice(0, 10).map((card, i) => (
          <CasinoCard key={i} {...card} />
        ))}
      </div> */}
    </div>
  );
}
