"use client";

import { AuthGuard } from "@/components/providers/AuthGuard";
import { ArticleNoticeCardLink } from "@/components/article/ArticleNoticeCardLink";
import { ARTICLE_NOTICE_MOCKS } from "@/mocks/articleNotices";

export default function ArticlePage() {
  return (
    <AuthGuard>
      <div className="flex w-full flex-col px-0 py-5 pb-10 md:px-5">
        <h1 className="mb-5 text-xl font-bold text-ink md:text-2xl">공지사항</h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLE_NOTICE_MOCKS.map((item) => (
            <ArticleNoticeCardLink key={item.id} item={item} />
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
