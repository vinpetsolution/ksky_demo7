"use client";

import { cn } from "@/utils/classNames";

export type NoticePromotionCardProps = {
  title: string;
  snippet: string;
  writer?: string;
  date: string;
  placeholderLabel?: string;
  className?: string;
  onClick?: () => void;
};

export function NoticePromotionCard({
  title,
  snippet,
  writer = "관리자",
  date,
  placeholderLabel = "공지사항",
  className,
  onClick,
}: NoticePromotionCardProps) {
  const Tag = onClick ? "button" : "article";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "group relative block w-full aspect-square cursor-pointer overflow-hidden rounded-[10px]",
        "border border-[rgba(128,101,40,0.22)] bg-panel",
        "hover:-translate-y-[2px] hover:border-gold-border",
        "transition-all duration-300 ease-in-out",
        "text-left",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 overflow-hidden bg-panel",
          "after:pointer-events-none after:absolute after:inset-0 after:content-['']",
          "after:bg-[linear-gradient(0deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.82)_30%,rgba(0,0,0,0.35)_60%,transparent_100%)]",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center pt-[50px] text-base font-bold tracking-wide text-[#757575] opacity-[0.28]"
        >
          {placeholderLabel}
        </span>
      </div>

      <div className="absolute inset-0 z-1 flex min-h-0 flex-col items-stretch justify-end gap-1 px-3 pb-3 pt-2.5">
        <h4
          className={cn(
            "line-clamp-1 text-sm font-bold leading-[1.3] text-white",
            "transition-colors duration-300 ease-in-out group-hover:text-gold-soft",
          )}
        >
          {title}
        </h4>
        <p className="m-0 line-clamp-2 text-xs font-normal leading-[1.4] text-[#999999] break-keep">
          {snippet}
        </p>
        <div className="mt-1 flex items-center justify-between gap-2 border-t border-[rgba(128,101,40,0.22)] pt-1.5">
          <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-[#bcbcbc]">
            {writer}
          </span>
          <time
            dateTime={date}
            className="shrink-0 text-right text-[11px] font-medium tabular-nums text-gold-soft"
          >
            {date}
          </time>
        </div>
      </div>
    </Tag>
  );
}
