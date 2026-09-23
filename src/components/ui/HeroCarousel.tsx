"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/utils/classNames";
import type { BannerVideo } from "@/mocks/slides";

interface HeroCarouselProps {
  videos: BannerVideo[];
  interval?: number;
}

const AUTO_PLAY_MS = 3000;
const FADE_MS = 800;

export default function HeroCarousel({
  videos,
  interval = AUTO_PLAY_MS,
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const prevActiveRef = useRef(0);

  const goTo = useCallback((i: number) => {
    setActive((prev) => {
      if (prev === i) return prev;
      prevActiveRef.current = prev;
      return i;
    });
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    if (videos.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => {
        prevActiveRef.current = prev;
        return (prev + 1) % videos.length;
      });
    }, interval);
    return () => clearInterval(id);
  }, [tick, videos.length, interval]);

  useEffect(() => {
    const incoming = videoRefs.current[active];
    if (incoming) {
      incoming.currentTime = 0;
      void incoming.play().catch(() => { });
    }

    const outgoingIndex = prevActiveRef.current;
    if (outgoingIndex === active) return;

    const timeoutId = window.setTimeout(() => {
      const outgoing = videoRefs.current[outgoingIndex];
      if (!outgoing || outgoingIndex === active) return;
      outgoing.pause();
      outgoing.currentTime = 0;
    }, FADE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [active]);

  if (videos.length === 0) return null;

  const activeHref = videos[active]?.href;

  return (
    <section className="relative aspect-21/9 xl:h-[57vh] w-full overflow-hidden bg-white">
      {videos.map((item, i) => (
        <video
          key={item.src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={item.src}
          muted
          playsInline
          loop
          preload="auto"
          className={cn(
            "absolute inset-0 h-full w-full object-fill",
            "transition-opacity duration-800 ease-in-out will-change-[opacity]",
            i === active ? "z-1 opacity-100" : "z-0 opacity-0",
          )}
        />
      ))}

      {activeHref ? (
        <Link
          href={activeHref}
          className="absolute inset-0 z-2"
          aria-label="Banner link"
        />
      ) : null}

      {videos.length > 1 && (
        <div className="absolute inset-x-0 bottom-2.5 z-10 flex justify-center gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "h-2 cursor-pointer border-0 p-0 transition-[background,width,border-radius] duration-300 ease-in-out",
                i === active
                  ? "w-5 rounded-[6px] bg-[#fffffff2]"
                  : "w-2 rounded-full bg-[#fff6]",
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
