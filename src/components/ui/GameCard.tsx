"use client";

import Image from "next/image";
import { AuthLink } from "@/components/ui/AuthLink";
import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";
import { FaHeart } from "react-icons/fa";

export interface GameCardProps {
  image?: string;
  video?: string;
  gif?: string;
  useGif?: boolean;
  href?: string;
  name?: string;
  className?: string;
  onClick?: () => void;
  showFavoriteButton?: boolean;
  isFavorite?: boolean;
}

type MediaKind = "gif" | "video" | "image" | "none";

function resolveMedia(
  image?: string,
  video?: string,
  gif?: string,
  useGif = false,
): { kind: MediaKind; src?: string } {
  if (useGif && gif) return { kind: "gif", src: gif };
  if (video) return { kind: "video", src: video };
  if (image) return { kind: "image", src: image };
  return { kind: "none" };
}

function GameCardMedia({
  kind,
  src,
  name,
}: {
  kind: MediaKind;
  src?: string;
  name?: string;
}) {
  if (kind === "none" || !src) {
    return <div className="h-full w-full bg-[#0d1117]" aria-hidden />;
  }

  if (kind === "video") {
    return (
      <video
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="h-full w-full rounded-lg object-fill"
      />
    );
  }

  if (kind === "gif") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name ?? ""}
        className="h-full w-full rounded-lg object-cover"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={name ?? ""}
      fill
      unoptimized
      className="rounded-lg object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 20vw"
    />
  );
}

export function GameCard({
  image,
  video,
  gif,
  useGif = false,
  href,
  name,
  className,
  onClick,
  showFavoriteButton = false,
  isFavorite = false,
}: GameCardProps) {
  const media = resolveMedia(image, video, gif, useGif);
  const hasMedia = media.kind !== "none";

  if (!hasMedia && !href && !onClick) {
    return null;
  }

  const actionButton = name ? (
    <Button
      variant="gold"
      size="sm"
      ripple
      type="button"
      className={cn(
        "max-w-[90%] truncate rounded-full",
        "h-8 min-w-23 text-[#1c1c1c] px-4 font-bold text-[13px]",
        "translate-y-0 border border-[rgba(255,236,170,0.42)]!",
        "shadow-[0_0_16px_#c9a22794]!",
        "transition-all duration-300 hover:scale-[1.05]",
        "hover:shadow-[0_0_20px_#c9a227ad]!",
      )}
      onClick={href ? undefined : onClick}
    >
      {name}
    </Button>
  ) : null;

  return (
    <div
      className={cn(
        "game-card-border-wrap group relative h-full w-full cursor-default overflow-hidden rounded-lg p-[1.5px]",
        className,
      )}
    >
      <div className="relative z-9 h-full w-full overflow-hidden rounded-lg bg-[#0d1117]">
        <div className="absolute inset-0 transition-opacity duration-350 ease-[cubic-bezier(0.35,0.95,0.4,1)] overflow-hidden">
          <GameCardMedia kind={media.kind} src={media.src} name={name} />
        </div>
        {showFavoriteButton && (
          <div className="absolute bottom-1.5 right-1.5 z-20">
            <FaHeart className={cn("size-4.5 hover:scale-110 transition-all duration-300", isFavorite ? "text-[#fde60e]" : "text-white")} aria-hidden />
          </div>
        )}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-15 flex items-center justify-center",
            "bg-[linear-gradient(180deg,#0000002e,#00000085,#000000c2)]",
            "opacity-0 backdrop-blur-[3px] transition-opacity duration-320 ease-in-out",
            "group-hover:opacity-100",
          )}
        >
          {actionButton ? (
            href ? (
              <AuthLink
                href={href}
                className="pointer-events-auto relative z-20 cursor-pointer"
                onClick={onClick}
              >
                {actionButton}
              </AuthLink>
            ) : (
              <div className="pointer-events-auto relative z-20">{actionButton}</div>
            )
          ) : null}
        </div>

      </div>
    </div>
  );
}
