import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

export function ArticleDetailBackLink() {
  return (
    <Link
      href="/article"
      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-gold-border bg-panel px-3 text-xs font-semibold text-ink no-underline transition-[border-color,color] duration-200 hover:border-gold hover:text-gold"
    >
      <IoChevronBack className="size-5 shrink-0 text-ink" aria-hidden />
      모든 공지사항
    </Link>
  );
}
