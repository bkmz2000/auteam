import Link from "next/link";
import { notFound } from "next/navigation";
import { reader } from "../../../../lib/reader";

export const dynamic = "force-dynamic";

export default async function TeacherPage({ params }: { params: { slug: string } }) {
  let entry: any = null;
  try {
    entry = await reader.collections.teachers.read(params.slug);
  } catch (e) {
    console.error("Error fetching teacher:", e);
  }

  if (!entry) return notFound();

  return (
    <div>
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center text-4xl font-bold">
              {entry.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">{entry.name}</h1>
              <p className="text-xl text-textSecondary mb-4">{entry.totalExperience}</p>
              <div className="flex flex-wrap gap-2">
                {(entry.languages || []).map((lang: string, i: number) => (
                  <span key={i} className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {entry.body && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">О себе</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 whitespace-pre-wrap">{entry.body}</p>
                  </div>
                </div>
              )}

              {entry.areasOfWork && entry.areasOfWork.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Сферы работы</h2>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {entry.areasOfWork.map((a: any, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <span className="text-accent mt-1">•</span>
                        {a.area}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entry.consultingTopics && entry.consultingTopics.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Темы равного консультирования</h2>
                  <div className="flex flex-wrap gap-2">
                    {entry.consultingTopics.map((t: any, i: number) => (
                      <span key={i} className="text-sm bg-background text-accent px-3 py-1 rounded-full">
                        {t.topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.teachingStyle && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Особенности преподавания</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">{entry.teachingStyle}</p>
                </div>
              )}

              {entry.otherExperience && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Другой опыт</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">{entry.otherExperience}</p>
                </div>
              )}

              {entry.photos && entry.photos.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Фотографии</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {entry.photos.map((p: any, i: number) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.photo} alt={`${entry.name} фото ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {entry.education && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Образование</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{entry.education}</p>
                </div>
              )}

              {entry.certificates && entry.certificates.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Сертификаты</h3>
                  <ul className="space-y-2">
                    {entry.certificates.map((c: any, i: number) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-accent">✓</span>
                        {c.cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entry.interests && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Интересы</h3>
                  <p className="text-gray-600">{entry.interests}</p>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6 shadow-md">
                <Link
                  href="/contacts"
                  className="block w-full bg-accent text-white text-center py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  Записаться на занятие
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
