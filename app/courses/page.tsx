import Link from "next/link";
import { client } from "../../tina/__generated__/databaseClient";

export const dynamic = "force-dynamic";

function formatPrice(pricePerHour?: number, currency?: string): string {
  if (!pricePerHour) return "по договорённости";
  if (currency) {
    return `от ${pricePerHour} ${currency}`;
  }
  return `от ${pricePerHour} рублей`;
}

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
      (c.format?.minAge >= 5 && c.format?.maxAge <= 12)
    ),
    "Подросткам": courses.filter((c) =>
      c.ageGroup?.toLowerCase().includes("подрост") ||
      (c.format?.minAge >= 10 && c.format?.maxAge <= 17)
    ),
    "Взрослым": courses.filter((c) =>
      c.ageGroup?.toLowerCase().includes("взросл") ||
      c.format?.minAge >= 16
    ),
  };

  const hasCourses = courses.length > 0;

  // Sample courses with correct Russian pricing from reference document
  const ageGroups = [
    {
      key: "Детям",
      title: "Детям",
      subtitle: "Занятия для детей от 5 лет",
      icon: "",
      color: "bg-gray-200",
      sampleCourses: [
        {
          name: "Сопровождение в обучении",
          teacherName: "Соня",
          description: "Помощь ребёнку сосредоточиться и выполнить домашнюю программу. Созвоны/активная поддержка в чате по времени, до двух часов.",
          price: "1800 рублей / 8500 драмов",
          priceNote: "в группе — 1300 рублей / 6000 драмов",
          ageGroup: "5–18 лет",
        },
        {
          name: "Репетиторство по школьным предметам",
          teacherName: "Соня",
          description: "Математика, русский, чтение, язык и речевая практика, речь и альтернативная коммуникация, окружающий мир, английский, музыка, ИЗО, технология, физкультура.",
          price: "от 1200 рублей / 5400 драмов",
          priceNote: "30–45 минут",
          ageGroup: "6–18 лет",
        },
        {
          name: "Совместное чтение",
          teacherName: "Соня",
          description: "Созвон или чат с голосовыми сообщениями, группы по уровням.",
          price: "1400 рублей / 6500 драмов",
          priceNote: "индивидуально, 40 минут; в группе — 1100 рублей / 5000 драмов",
          ageGroup: "6–18 лет",
        },
        {
          name: "Творческие мастерские",
          teacherName: "Соня",
          description: "Рисование, лепка, аппликация по образцу с постепенным увеличением творческого компонента. Для невербальных детей с навыками имитации или вместе с родителем.",
          price: "1000 рублей / 4600 драмов",
          priceNote: "30 минут",
          ageGroup: "5–18 лет",
        },
        {
          name: "Блоггинг",
          teacherName: "Соня",
          description: "Учимся рассказывать о себе через видео, тексты и картинки. Для вербальных и невербальных детей.",
          price: "1100 рублей / 5000 драмов",
          priceNote: "группа, 60 минут; индивидуально — 1000 рублей / 4600 драмов",
          ageGroup: "5–10 лет",
        },
        {
          name: "Группы общения и поддержки",
          teacherName: "Соня",
          description: "Созвон, выбор тем вместе с участниками, составление расписания.",
          price: "1000 рублей / 4600 драмов",
          priceNote: "60 минут",
          ageGroup: "6–18 лет",
        },
      ],
    },
    {
      key: "Подросткам",
      title: "Подросткам",
      subtitle: "Занятия для подростков от 11 лет",
      icon: "",
      color: "bg-gray-200",
      sampleCourses: [
        {
          name: "Репетиторство по школьным предметам",
          teacherName: "Саша",
          description: "Математика, английский язык, история.",
          price: "от 1200 рублей / 5400 драмов",
          priceNote: "30–45 минут",
          ageGroup: "11–17 лет",
        },
        {
          name: "Ролевые игры",
          teacherName: "Соня и Саша",
          description: "Разговорные, текстовые, создание этюдов. Включаем важные социальные и коммуникативные ситуации.",
          price: "от 1000 рублей / 4600 драмов",
          priceNote: "60 минут",
          ageGroup: "11–17 лет",
        },
        {
          name: "Киноклуб",
          teacherName: "Саша",
          description: "Смотрим и обсуждаем фильмы.",
          price: "от 500 рублей / 2000 драмов",
          priceNote: "или за донат",
          ageGroup: "12+ лет",
        },
        {
          name: "Тренинг социальных навыков",
          teacherName: "Соня",
          description: "По социальным историям (видео, комиксы и тексты), отыгрываем в сценках, обсуждаем. Для вербальных и невербальных.",
          price: "от 1000 рублей / 4600 драмов",
          priceNote: "60 минут",
          ageGroup: "12+ лет",
        },
        {
          name: "Любовь и отношения",
          teacherName: "Соня",
          description: "Для старших подростков от 14 лет. Где искать партнёров, как знакомиться, признаваться в любви, что важно в отношениях и сексе, когда секс становится насильственным.",
          price: "от 1000 рублей / 4600 драмов",
          priceNote: "60 минут",
          ageGroup: "14+ лет",
        },
        {
          name: "Введение в нейроразнообразие",
          teacherName: "Соня",
          description: "Лекционный групповой формат для вербальных людей.",
          price: "1500 рублей / 7000 драмов",
          priceNote: "60 минут",
          ageGroup: "12+ лет",
        },
      ],
    },
    {
      key: "Взрослым",
      title: "Взрослым",
      subtitle: "Занятия для взрослых от 18 лет",
      icon: "",
      color: "bg-gray-200",
      sampleCourses: [
        {
          name: "Группа поддержки",
          teacherName: "Соня",
          description: "Общая группа поддержки для взрослых. Созвон или текст.",
          price: "1000 рублей / 4600 драмов",
          priceNote: "60 минут",
          ageGroup: "18+ лет",
        },
        {
          name: "Группа поддержки для эмигрантов",
          teacherName: "Соня",
          description: "Поддержка для людей с опытом эмиграции.",
          price: "1000 рублей / 4600 драмов",
          priceNote: "60 минут",
          ageGroup: "18+ лет",
        },
        {
          name: "Коворкинг",
          teacherName: "Соня",
          description: "Совместная работа онлайн.",
          price: "от 500 рублей / 2000 драмов",
          priceNote: "или за донат",
          ageGroup: "18+ лет",
        },
        {
          name: "Английский язык",
          teacherName: "Саша",
          description: "Курсы английского для взрослых.",
          price: "от 1200 рублей / 5400 драмов",
          priceNote: "30–45 минут",
          ageGroup: "18+ лет",
        },
        {
          name: "Читательский клуб",
          teacherName: "Соня",
          description: "Совместное чтение и обсуждение выбранных книг. Созвон или чат с голосовыми сообщениями.",
          price: "1400 рублей / 6500 драмов",
          priceNote: "индивидуально, 40 минут; в группе — 1100 рублей / 5000 драмов",
          ageGroup: "18+ лет",
        },
        {
          name: "Равное консультирование",
          teacherName: "Соня",
          description: "Свободная беседа о жизни, интересах и сложностях. Созвон или чат.",
          price: "донат от 500 рублей / 2500 драмов",
          priceNote: "по времени как получится",
          ageGroup: "18+ лет",
        },
      ],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Курсы</h1>
          <p className="text-xl text-textSecondary max-w-3xl">
            Выберите занятие по душе. Занятия на русском, армянском и английском языках.
          </p>
        </div>
      </section>

      {/* Course Sections */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {ageGroups.map((group) => {
            const tinaCourses = grouped[group.key as keyof typeof grouped] || [];
            const displayCourses = hasCourses && tinaCourses.length > 0 ? tinaCourses : group.sampleCourses;

            return (
              <div key={group.key}>
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-xl ${group.color} flex items-center justify-center text-2xl`}>
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
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-accent bg-background px-2 py-1 rounded-full">
                          {course.ageGroup || group.title}
                        </span>
                        {course.format?.duration && (
                          <span className="text-xs text-gray-500">
                            {course.format.duration} мин
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                        {course.name}
                      </h3>
                      {course.teacherName && (
                        <p className="text-sm text-gray-500 mb-2">
                          Педагог: {course.teacherName}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {course.description}
                      </p>
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-base font-bold text-gray-900">
                              {course.price}
                            </span>
                            {course.priceNote && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {course.priceNote}
                              </p>
                            )}
                          </div>
                          <Link
                            href="/contacts"
                            className="text-sm font-medium text-accent hover:text-accent transition-colors whitespace-nowrap"
                          >
                            Записаться →
                          </Link>
                        </div>
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
            className="inline-flex items-center gap-2 bg-accent text-textPrimary px-8 py-4 rounded-xl font-semibold hover:bg-hover transition-colors"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </div>
  );
}
