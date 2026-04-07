import Link from "next/link";
import { client } from "../../tina/__generated__/databaseClient";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  let newsItems: any[] = [];
  try {
    const res = await client.queries.newsConnection({ first: 20 });
    newsItems = res.data.newsConnection?.edges?.map((e: any) => e.node) || [];
  } catch (e) {
    console.error("Error fetching news:", e);
  }

  const hasNews = newsItems.length > 0;

  // Sample news if no content from Tina
  const sampleNews = [
    {
      title: "Добро пожаловать на нашу платформу!",
      slug: "welcome",
      date: "2024-01-15",
      excerpt: "Мы рады объявить о запуске нашей платформы для нейроотличных детей, подростков, взрослых и их близких в Армении.",
    },
    {
      title: "Новые курсы для подростков",
      slug: "new-teen-courses",
      date: "2024-02-01",
      excerpt: "Запускаем новые занятия для подростков: киноклуб, ролевые игры и тренинг социальных навыков.",
    },
    {
      title: "Группы поддержки для взрослых",
      slug: "adult-support-groups",
      date: "2024-02-15",
      excerpt: "Приглашаем взрослых на группы поддержки. Созвон или текст — выбирайте удобный формат.",
    },
  ];

  const displayNews = hasNews ? newsItems : sampleNews;

  return (
    <div>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Новости</h1>
          <p className="text-xl text-textSecondary max-w-3xl">
            Актуальные новости нашего проекта, анонсы новых курсов и мероприятий
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayNews.map((item: any, i: number) => (
              <Link
                key={item.slug || item._sys?.filename || i}
                href={`/news/${item.slug || item._sys?.filename?.replace('.md', '')}`}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="text-sm text-gray-500 mb-2">
                  {item.date || item._sys?.basename?.slice(0, 10) || ""}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {item.excerpt || item.body?.slice(0, 150) || ""}
                </p>
                <div className="mt-4 text-sm font-medium text-accent group-hover:text-accent transition-colors">
                  Читать далее →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
