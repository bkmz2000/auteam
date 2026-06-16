import Link from "next/link";
import { reader } from "../../../lib/reader";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  let newsItems: { slug: string; entry: any }[] = [];
  try {
    newsItems = await reader.collections.news.all();
  } catch (e) {
    console.error("Error fetching news:", e);
  }

  return (
    <div>
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Новости</h1>
          <p className="text-xl text-textSecondary max-w-3xl">
            Актуальные новости нашего проекта, анонсы новых курсов и мероприятий
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {newsItems.length === 0 ? (
            <p className="text-textSecondary text-center py-12">Новостей пока нет.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map(({ slug, entry }) => (
                <Link
                  key={slug}
                  href={`/news/${slug}`}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 group"
                >
                  <div className="text-sm text-textSecondary mb-2">
                    {entry.date ? new Date(entry.date).toLocaleDateString("ru-RU") : ""}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-accent transition-colors mb-3">
                    {entry.title}
                  </h2>
                  {entry.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">{entry.description}</p>
                  )}
                  <div className="mt-4 text-sm font-medium text-accent">Читать →</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
