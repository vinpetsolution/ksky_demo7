import type { ReactNode } from "react";

type ArticleDetailPanelProps = {
  title: string;
  publishedAt: string;
  children?: ReactNode;
};

export function ArticleDetailPanel({
  title,
  publishedAt,
  children,
}: ArticleDetailPanelProps) {
  return (
    <article className="mb-5 rounded-[10px] border border-[rgba(128,101,40,0.3)] bg-panel px-[18px] py-4">
      <h1 className="mb-3.5 break-keep border-b border-[rgba(128,101,40,0.25)] pb-3 text-lg font-bold leading-[1.45] text-white">
        {title}
      </h1>
      <time
        dateTime={publishedAt}
        className="-mt-2 mb-3.5 block text-xs font-medium tabular-nums leading-[1.4] text-gold-soft"
      >
        {publishedAt}
      </time>
      {children ? (
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-white/95">
          {children}
        </div>
      ) : null}
    </article>
  );
}
