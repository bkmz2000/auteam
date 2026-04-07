import Link from "next/link";
import { client } from "../../../tina/__generated__/databaseClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export default async function NewsDetailPage({ params }: PageProps) {
  let newsItem: any = null;
  try {
    const res = await client.queries.news({ relativePath: `${params.slug}.md` });
    newsItem = res.data.news;
  } catch (e) {
    console.error("Error fetching news:", e);
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Новость не найдена</h1>
          <p className="text-gray-600 mb-6">
            Возможно, эта страница была удалена или перемещена.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-accent hover:text-accent font-medium"
          >
            ← Вернуться к новостям
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-textSecondary hover:text-textPrimary mb-6 transition-colors"
          >
            ← Назад к новостям
          </Link>
          <div className="text-sm text-textSecondary mb-2">
            {newsItem.date || ""}
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">{newsItem.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            {newsItem.body ? (
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="whitespace-pre-wrap">{newsItem.body}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Содержимое этой новости скоро появится.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
