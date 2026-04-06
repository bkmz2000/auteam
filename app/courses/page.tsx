import Link from "next/link";
import { client } from "../../tina/__generated__/databaseClient";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  let courses: any[] = [];
  try {
    const res = await client.queries.courseConnection({ first: 50 });
    courses = res.data.courseConnection?.edges?.map((e: any) => e.node) || [];
  } catch (e) {
    console.error("Error fetching courses:", e);
  }

  // Group courses by age group
  const grouped = {
    "Детям": courses.filter((c) =>
      c.ageGroup?.toLowerCase().includes("дет") ||
      c.format?.minAge < 12
    ),
    "Подросткам": courses.filter((c) =>
      c.ageGroup?.toLowerCase().includes("подрост") ||
      (c.format?.minAge >= 10 && c.format?.maxAge <= 17)
    ),
    "Взрослым": courses.filter((c) =>
      c.ageGroup?.toLowerCase().includes("взросл") ||
      c.format?.minAge >= 16
    ),
    "Специалистам": courses.filter((c) =>
      c.ageGroup?.toLowerCase().includes("специал") ||
      c.name?.toLowerCase().includes("стажировк")
    ),
  };

  // Fallback: if no courses, show sample data
  const hasCourses = courses.length > 0;

  const ageGroups = [
    {
      key: "Детям",
      title: "Детям",
      subtitle: "Занятия для детей от 5 до 10 лет",
      icon: "🎈",
      color: "from-pink-400 to-rose-500",
      sampleCourses: [
        { name: "Сопровождение в обучении", teacherName: "Соня", description: "Помощь ребёнку сосредоточиться и выполнить домашнюю программу", price: "от 1300 ₽", ageGroup: "5-12 лет" },
        { name: "Репетиторство по школьным предметам", teacherName: "Соня", description: "Математика, русский, чтение, окружающий мир", price: "от 1200 ₽", ageGroup: "6-12 лет" },
        { name: "Творческие мастерские", teacherName: "Соня", description: "Рисование, лепка, аппликация по образцу", price: "от 1000 ₽", ageGroup: "5-12 лет" },
        { name: "Группы общения и поддержки", teacherName: "Соня", description: "Созвон, выбор тем вместе с участниками", price: "от 1000 ₽", ageGroup: "6-12 лет" },
        { name: "Блоггинг", teacherName: "Соня", description: "Учимся рассказывать о себе через видео и тексты", price: "от 1000 ₽", ageGroup: "5-10 лет" },
        { name: "Совместное чтение", teacherName: "Соня", description: "Читаем и обсуждаем книги в группе", price: "от 1100 ₽", ageGroup: "6-12 лет" },
      ],
    },
    {
      key: "Подросткам",
      title: "Подросткам",
      subtitle: "Занятия для подростков от 11 до 17 лет",
      icon: "🎮",
      color: "from-violet-400 to-purple-500",
      sampleCourses: [
        { name: "Репетиторство по школьным предметам", teacherName: "Саша", description: "Математика, английский, история", price: "от 1200 ₽", ageGroup: "11-17 лет" },
        { name: "Ролевые игры", teacherName: "Соня и Саша", description: "Разговорные, текстовые, создание этюдов", price: "от 1000 ₽", ageGroup: "11-17 лет" },
        { name: "Киноклуб", teacherName: "Саша", description: "Смотрим и обсуждаем фильмы", price: "от 500 ₽", ageGroup: "12+ лет" },
        { name: "Тренинг социальных навыков", teacherName: "Соня", description: "По социальным историям, отыгрываем сценки", price: "от 1000 ₽", ageGroup: "12+ лет" },
        { name: "Любовь и отношения", teacherName: "Соня", description: "Важные темы для старших подростков от 14 лет", price: "от 1000 ₽", ageGroup: "14+ лет" },
        { name: "Цифровая безопасность", teacherName: "Соня", description: "Безопасность в интернете для подростков", price: "от 1400 ₽", ageGroup: "9-11 лет" },
      ],
    },
    {
      key: "Взрослым",
      title: "Взрослым",
      subtitle: "Занятия для взрослых от 18 лет",
      icon: "🌟",
      color: "from-cyan-400 to-blue-500",
      sampleCourses: [
        { name: "Группа поддержки", teacherName: "Соня", description: "Общая группа для взрослых", price: "от 1000 ₽", ageGroup: "18+ лет" },
        { name: "Группа поддержки для эмигрантов", teacherName: "Соня", description: "Поддержка для людей с опытом эмиграции", price: "от 1000 ₽", ageGroup: "18+ лет" },
        { name: "Английский язык", teacherName: "Саша", description: "Курсы английского для взрослых", price: "от 1200 ₽", ageGroup: "18+ лет" },
        { name: "Коворкинг", teacherName: "Соня", description: "Совместная работа онлайн", price: "от 500 ₽", ageGroup: "18+ лет" },
        { name: "Читательский клуб", teacherName: "Соня", description: "Совместное чтение и обсуждение книг", price: "от 1000 ₽", ageGroup: "18+ лет" },
        { name: "Равное консультирование", teacherName: "Соня", description: "Беседа о жизни, интересах и сложностях", price: "донат от 500 ₽", ageGroup: "18+ лет" },
      ],
    },
    {
      key: "Специалистам",
      title: "Специалистам",
      subtitle: "Обмен опытом и стажировки для коллег",
      icon: "👩‍🏫",
      color: "from-amber-400 to-orange-500",
      sampleCourses: [
        { name: "Обмен опытом", teacherName: "Педагоги", description: "Созвон или текст с коллегами", price: "донат" },
        { name: "Стажировка (месяц)", teacherName: "Команда", description: "Посещение интересующих занятий, проведение своих", price: "8000 ₽" },
        { name: "Стажировка (неделя)", teacherName: "Команда", description: "Одна-три недели стажировки", price: "от 2000 ₽" },
        { name: "Проведение занятия/лекции", teacherName: "Вы", description: "Бесплатно или за донат, с переводчиком или без", price: "бесплатно" },
      ],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-violet-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Курсы</h1>
          <p className="text-xl text-violet-100 max-w-3xl">
            Выберите занятие по душе. Занятия на русском, армянском и английском языках.
          </p>
        </div>
      </section>

      {/* Course Sections */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {ageGroups.map((group) => {
            const displayCourses = hasCourses
              ? grouped[group.key as keyof typeof grouped]?.length > 0
                ? grouped[group.key as keyof typeof grouped]
                : group.sampleCourses
              : group.sampleCourses;

            return (
              <div key={group.key}>
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-2xl`}>
                    {group.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{group.title}</h2>
                    <p className="text-gray-600">{group.subtitle}</p>
                  </div>
                </div>

                {/* Course Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayCourses.map((course: any, i: number) => (
                    <div
                      key={`${course.name}-${i}`}
                      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                    >
                      {course.photo?.src && (
                        <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={course.photo.src}
                            alt={course.photo?.alt || course.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">
                          {course.ageGroup || group.title}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                        {course.name}
                      </h3>
                      {course.teacherName && (
                        <p className="text-sm text-gray-500 mb-2">
                          Педагог: {course.teacherName}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-lg font-bold text-gray-900">
                          {course.price}
                        </span>
                        <Link
                          href="/contacts"
                          className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
                        >
                          Записаться →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Не нашли подходящее?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами — мы поможем подобрать занятие или ответим на вопросы
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 bg-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-violet-700 transition-colors"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </div>
  );
}
