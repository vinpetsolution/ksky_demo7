"use client";

import HeroCarousel from "@/components/ui/HeroCarousel";
import { BANNER_VIDEOS } from "@/mocks/slides";
import Casino from "@/components/casino/Casino";
import { AuthGuard } from "@/components/providers/AuthGuard";

const GameCasinoPage = () => {
  return (
    <AuthGuard>
      <HeroCarousel videos={BANNER_VIDEOS} />
      <Casino />
    </AuthGuard>
  );
};

export default GameCasinoPage;
