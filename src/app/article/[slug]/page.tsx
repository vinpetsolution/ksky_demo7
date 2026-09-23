import { notFound } from "next/navigation";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { ArticleDetailBackLink } from "@/components/article/ArticleDetailBackLink";
import { ArticleDetailPanel } from "@/components/article/ArticleDetailPanel";
import { ARTICLE_NOTICE_MOCKS } from "@/mocks/articleNotices";

export function generateStaticParams() {
  return ARTICLE_NOTICE_MOCKS.map((item) => ({ slug: item.id }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = ARTICLE_NOTICE_MOCKS.find((notice) => notice.id === slug);

  if (!item) {
    notFound();
  }

  return (
    <AuthGuard>
      <div className="flex w-full flex-col px-0 py-5 pb-10 md:px-5">
        <div className="mb-4">
          <ArticleDetailBackLink />
        </div>
        <ArticleDetailPanel title={item.title} publishedAt={item.date}>
          {item.snippet}
        </ArticleDetailPanel>
      </div>
    </AuthGuard>
  );
}
