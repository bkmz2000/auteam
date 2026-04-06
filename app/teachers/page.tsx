import Link from "next/link";
import { client } from "../../tina/__generated__/databaseClient";

export const dynamic = "force-dynamic";

export default async function TeachersPage() {
  let teachers: any[] = [];
  try {
    const res = await client.queries.teacherConnection({ first: 20 });
    teachers = res.data.teacherConnection?.edges?.map((e: any) => e.node) || [];
  } catch (e) {
    console.error("Error fetching teachers:", e);
  }

  // If no teachers from Tina, use sample data
  const hasTeachers = teachers.length > 0;

  const sampleTeachers = [
    {
      name: "Соня",
      slug: "sonya",
      languages: [{ lang: "русский" }, { lang: "английский B1" }],
      totalExperience: "9,5 лет",
      areasOfWork: [
        "Репетиторство и индивидуальные занятия",
        "Коррекционные занятия",
        "Группы общения и поддержки",
        "Творческие занятия",
      ],
      shortBio: "Нейроотличный педагог, основательница платформы. Специализируется на работе с нейроотличными детьми и подростками.",
    },
    {
      name: "Саша",
      slug: "sasha",
      languages: [{ lang: "русский" }, { lang: "английский" }],
      totalExperience: "5+ лет",
      areasOfWork: [
        "Математика",
        "Английский язык",
        "История",
        "Киноклуб",
      ],
      shortBio: "Опытный педагог, ведёт занятия для подростков и взрослых по школьным предметам.",
    },
  ];

  const displayTeachers = hasTeachers ? teachers : sampleTeachers;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-violet-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Наши педагоги</h1>
          <p className="text-xl text-violet-100 max-w-3xl">
            Все наши педагоги — нейроотличные люди или их близкие.
            У каждого есть очень подробная страничка, чтобы вы могли выбрать подходящего специалиста.
          </p>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTeachers.map((teacher: any) => (
              <Link
                key={teacher.slug || teacher._sys?.filename}
                href={`/teachers/${teacher.slug || teacher._sys?.filename?.replace('.md', '')}`}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Avatar */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {teacher.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {teacher.totalExperience}
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {(teacher.languages || []).slice(0, 3).map((lang: any, i: number) => (
                    <span key={i} className="text-xs bg-violet-50 text-violet-600 px-2 py-1 rounded-full">
                      {typeof lang === 'string' ? lang : lang.lang}
                    </span>
                  ))}
                </div>

                {/* Short Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {teacher.shortBio || teacher.body?.slice(0, 150) || teacher.otherExperience?.slice(0, 150) || "Подробности на страничке педагога..."}
                </p>

                {/* Areas */}
                {teacher.areasOfWork && teacher.areasOfWork.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Сферы работы:</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher.areasOfWork.slice(0, 3).map((area: any, i: number) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {typeof area === 'string' ? area : area.area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 text-center">
                  <span className="text-sm font-medium text-violet-600 group-hover:text-violet-700 transition-colors">
                    Подробнее →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Как выбрать педагога?
            </h2>
            <p className="text-gray-600 mb-6">
              У каждого педагога есть очень подробная страничка с описанием подходов,
              резюме, особенностей преподавания и даже фотографиями домашних животных.
              Изучите их, чтобы сделать осознанный выбор!
            </p>
            <p className="text-gray-600">
              Если после изучения описаний у вас остались вопросы, вы можете{" "}
              <Link href="/contacts" className="text-violet-600 hover:underline">
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
