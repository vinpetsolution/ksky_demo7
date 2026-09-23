import Link from "next/link";
import { NoticePromotionCard } from "@/components/ui/NoticePromotionCard";
import type { ArticleNoticeMock } from "@/mocks/articleNotices";

type ArticleNoticeCardLinkProps = {
  item: ArticleNoticeMock;
};

export function ArticleNoticeCardLink({ item }: ArticleNoticeCardLinkProps) {
  return (
    <Link
      href={`/article/${item.id}`}
      className="block no-underline outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-[10px]"
    >
      <NoticePromotionCard
        title={item.title}
        snippet={item.snippet}
        writer={item.writer}
        date={item.date}
      />
    </Link>
  );
}
