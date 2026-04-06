import Link from "next/link";
import { client } from "../tina/__generated__/databaseClient";

export const dynamic = "force-dynamic";

const categories = [
  {
    title: "Детям",
    description: "Занятия для детей от 5 лет: подготовка к школе, сопровождение обучения, творческие мастерские",
    icon: "🎈",
    href: "/courses",
    color: "from-pink-400 to-rose-500",
  },
  {
    title: "Подросткам",
    description: "Репетиторство, ролевые игры, киноклуб, тренинги социальных навыков для подростков",
    icon: "🎮",
    href: "/courses",
    color: "from-violet-400 to-purple-500",
  },
  {
    title: "Взрослым",
    description: "Группы поддержки, курсы английского, творческие занятия, равное консультирование",
    icon: "🌟",
    href: "/courses",
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "Специалистам",
    description: "Обмен опытом, стажировки, проведение занятий для коллег",
    icon: "👩‍🏫",
    href: "/courses",
    color: "from-amber-400 to-orange-500",
  },
];

export default async function HomePage() {
  // Fetch featured courses
  let courses: any[] = [];
  try {
    const coursesRes = await client.queries.courseConnection({
      first: 6,
    });
    courses = coursesRes.data.courseConnection?.edges?.map((e: any) => e.node) || [];
  } catch (e) {
    console.error("Error fetching courses:", e);
  }

  // Fetch teachers
  let teachers: any[] = [];
  try {
    const teachersRes = await client.queries.teacherConnection({ first: 4 });
    teachers = teachersRes.data.teacherConnection?.edges?.map((e: any) => e.node) || [];
  } catch (e) {
    console.error("Error fetching teachers:", e);
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-violet-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Нейроотличные{" "}
              <span className="text-violet-200">нейроотличным</span>
            </h1>
            <p className="text-xl lg:text-2xl text-violet-100 mb-8 leading-relaxed">
              Платформа для нейроотличных детей, подростков, взрослых и их близких.
              Здесь нейроотличные специалисты помогают нейроотличным клиентам всех возрастов.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-white text-violet-600 px-6 py-3 rounded-xl font-semibold hover:bg-violet-50 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Выбрать курс
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-800 transition-colors border border-violet-500"
              >
                Присоединиться к команде
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Для кого мы работаем
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мы создаём пространство, где нейроотличные люди и их близкие могут учиться,
              развиваться и поддерживать друг друга
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-violet-200"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {courses.length > 0 && (
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Популярные курсы
                </h2>
                <p className="text-gray-600">
                  Выберите занятие по душе
                </p>
              </div>
              <Link
                href="/courses"
                className="hidden md:inline-flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700 transition-colors"
              >
                Все курсы
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 6).map((course) => (
                <div
                  key={course._sys?.filename}
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
                      {course.ageGroup || "Для всех"}
                    </span>
                    {course.teacherName && (
                      <span className="text-xs text-gray-500">
                        {course.teacherName}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  {course.pricing?.pricePerHour && (
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        от {course.pricing.pricePerHour} {course.pricing.currency || "₽"}
                      </span>
                      <Link
                        href="/contacts"
                        className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
                      >
                        Записаться →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors"
              >
                Все курсы
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Teachers Preview */}
      {teachers.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Наши педагоги
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Нейроотличные специалисты с большим опытом работы
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachers.map((teacher) => (
                <Link
                  key={teacher._sys?.filename}
                  href={`/teachers/${teacher.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {teacher.name?.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-violet-600 transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {teacher.totalExperience}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {teacher.languages?.slice(0, 2).map((lang: any, i: number) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {lang.lang}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/teachers"
                className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors"
              >
                Все педагоги
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-violet-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Готовы начать обучение?
          </h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Запишитесь на пробное занятие или знакомство с педагогом.
            Мы рады каждому!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold hover:bg-violet-50 transition-colors shadow-lg"
            >
              Записаться на занятие
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors border border-white/30"
            >
              Узнать больше о нас
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
