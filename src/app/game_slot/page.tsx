"use client";

import HeroCarousel from "@/components/ui/HeroCarousel";
import { BANNER_VIDEOS } from "@/mocks/slides";
import Slot from "@/components/slot/Slot";
import { AuthGuard } from "@/components/providers/AuthGuard";

const GameSlotPage = () => {
  return (
    <AuthGuard>
      <HeroCarousel videos={BANNER_VIDEOS} />
      <Slot />
    </AuthGuard>
  );
};

export default GameSlotPage;
