import Link from "next/link";
import { notFound } from "next/navigation";
import { reader } from "../../../../lib/reader";
import { MarkdocContent } from "../../../../components/MarkdocContent";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  let entry: any = null;
  try {
    entry = await reader.collections.news.read(params.slug);
  } catch (e) {
    console.error("Error fetching news:", e);
  }

  if (!entry) return notFound();

  return (
    <div>
      <section className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-textSecondary hover:text-textPrimary mb-6 transition-colors"
          >
            ← Назад к новостям
          </Link>
          <div className="text-sm text-textSecondary mb-2">
            {entry.date ? new Date(entry.date).toLocaleDateString("ru-RU") : ""}
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">{entry.title}</h1>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            {entry.body?.node ? (
              <MarkdocContent node={entry.body.node} />
            ) : (
              <p className="text-gray-500 italic">Содержимое этой новости скоро появится.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
