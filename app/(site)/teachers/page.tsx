import Link from "next/link";
import { reader } from "../../../lib/reader";

export const dynamic = "force-dynamic";

export default async function TeachersPage() {
  let teachers: { slug: string; entry: any }[] = [];
  try {
    teachers = await reader.collections.teachers.all();
  } catch (e) {
    console.error("Error fetching teachers:", e);
  }

  return (
    <div>
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Участники</h1>
          <p className="text-xl text-textSecondary max-w-3xl">
            Все наши участники — нейроотличные люди или их близкие. У каждого
            есть очень подробная страничка, чтобы вы могли выбрать подходящего
            специалиста.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map(({ slug, entry }) => (
              <Link
                key={slug}
                href={`/teachers/${slug}`}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {entry.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-accent transition-colors">
                      {entry.name}
                    </h3>
                    <p className="text-sm text-gray-500">{entry.totalExperience}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {(entry.languages || []).slice(0, 3).map((lang: string, i: number) => (
                    <span key={i} className="text-xs bg-background text-accent px-2 py-1 rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {entry.body?.slice(0, 150) ||
                    entry.otherExperience?.slice(0, 150) ||
                    "Подробности на страничке педагога..."}
                </p>

                {entry.areasOfWork && entry.areasOfWork.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Сферы работы:</p>
                    <div className="flex flex-wrap gap-1">
                      {entry.areasOfWork.slice(0, 3).map((a: any, i: number) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {a.area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 text-center">
                  <span className="text-sm font-medium text-accent">Подробнее →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Как выбрать педагога?</h2>
            <p className="text-gray-600 mb-6">
              У каждого педагога есть подробная страничка с описанием подходов, резюме и
              особенностей преподавания. Изучите их, чтобы сделать осознанный выбор!
            </p>
            <p className="text-gray-600">
              Если остались вопросы, вы можете{" "}
              <Link href="/contacts" className="text-accent hover:underline">
                записаться на знакомство
              </Link>{" "}
              или походить на занятия как стажёр.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
