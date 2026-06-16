import Link from "next/link";
import { reader } from "../../lib/reader";

export const dynamic = "force-dynamic";

// Reusable components inline or imported
function CourseCard({ course }: { course: any }) {
  const price = course.pricing?.price || "по договорённости";
  const currency = course.pricing?.currency === "amd" ? "֏" : "₽";
  const convertedPrice = course.pricing?.convertedPrice;
  const convertedCurrency =
    course.pricing?.convertedCurrency === "amd" ? "֏" : "₽";
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 hover:shadow-lg hover:border-gray-400 transition-all">
      <span className="inline-block text-xs font-semibold uppercase tracking-wide text-textSecondary bg-hover px-2 py-1 rounded mb-3">
        {course.ageGroup === "children"
          ? "Детям"
          : course.ageGroup === "teens"
            ? "Подросткам"
            : "Взрослым"}
      </span>
      <h3 className="text-lg font-bold text-textPrimary mb-2">{course.name}</h3>
      <p className="text-sm text-textSecondary mb-4">{course.description}</p>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm font-bold text-textPrimary">
          {price} {currency}
          {convertedPrice ? (
            <span className="font-normal text-textSecondary">
              {" "}
              / {convertedPrice} {convertedCurrency}
              <sup>*</sup>
            </span>
          ) : null}
        </div>
        <span className="text-xs text-textSecondary">
          {course.format?.duration || "60 мин"}
        </span>
      </div>
    </div>
  );
}

export default async function HomePage() {
  let courses: any[] = [];
  try {
    const entries = await reader.collections.courses.all();
    courses = entries.slice(0, 6).map(({ entry }) => entry);
  } catch {}

  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
          Платформа в Армении
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 max-w-2xl">
          Нейроотличные нейроотличным
        </h1>
        <p className="text-lg lg:text-xl text-textSecondary mb-8 max-w-xl leading-relaxed">
          Комьюнити, где нейроотличные люди, а также их близкие, обмениваются
          знаниями и опытом, вместе придумывают различные инициативы и помогают
          друг другу их воплотить.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/children"
            className="inline-flex items-center gap-2 bg-textPrimary text-background px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Найти занятие
          </Link>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-surface text-textPrimary border border-border px-6 py-3 rounded-xl font-semibold hover:bg-hover transition-colors"
          >
            Присоединиться к сообществу
          </Link>
        </div>
      </section>

      <div className="h-px bg-border max-w-7xl mx-auto" />

      {/* About */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-surface border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">О нас</h2>
          <p className="text-textSecondary leading-relaxed">
            Платформу создал Соня — нейроотличный педагог с 9,5 годами опыта.
            Здесь нейроотличные люди и их близкие могут официально зарабатывать
            на том, что любят, находить понимающих специалистов и получать
            поддержку. Мы верим в инклюзивное, самонаправленное общество.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Для всех возрастов",
              desc: "Занятия для детей от 2 лет, подростков и взрослых. Отдельные группы для родителей и опекунов.",
            },
            {
              title: "На разных языках",
              desc: "Занятия на русском, армянском и английском. Для невербальных людей — поддержка АДК.",
            },
            {
              title: "Квир-френдли",
              desc: "Мы открыты для всех, без исключения. Приходите такими, какие есть.",
            },
            {
              title: "Комьюнити",
              desc: "Инклюзия, самонаправленность, самоуправление, поддержка, общение, обучение.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <h3 className="font-bold text-base mb-2">{v.title}</h3>
              <p className="text-sm text-textSecondary leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-border max-w-7xl mx-auto" />

      {/* Direction cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-6">Выберите направление</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              age: "2–12 лет",
              title: "Детям",
              desc: "Сопровождение в обучении, творческие мастерские, группы общения, подготовка к школе.",
              href: "/children",
            },
            {
              age: "12–17 лет",
              title: "Подросткам",
              desc: "Репетиторство, ролевые игры, цифровая безопасность, тренинг социальных навыков.",
              href: "/teens",
            },
            {
              age: "18+",
              title: "Взрослым",
              desc: "Группы поддержки, английский язык, творчество, консультирование, настольные игры.",
              href: "/adults",
            },
          ].map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="bg-surface border border-border rounded-2xl p-6 hover:shadow-lg hover:border-gray-400 transition-all block"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-textSecondary bg-hover px-2 py-1 rounded mb-3">
                {c.age}
              </span>
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-textSecondary mb-4">{c.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-textSecondary">
                  {
                    courses.filter(
                      (co) =>
                        co.ageGroup ===
                        (c.href === "/children"
                          ? "children"
                          : c.href === "/teens"
                            ? "teens"
                            : "adults"),
                    ).length
                  }{" "}
                  курсов
                </span>
                <span className="text-sm font-semibold text-accent">
                  Смотреть
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="h-px bg-border max-w-7xl mx-auto" />

      {/* Teachers preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold">Участники</h2>
          <Link
            href="/teachers"
            className="text-sm font-medium text-accent hover:underline"
          >
            Участники
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "Соня",
              slug: "sonya",
              role: "Основатель, нейроотличный педагог — 9,5 лет",
              langs: ["русский", "английский B1"],
              bio: "Специализируется на сопровождении детей с РАС, ЗПР, интеллектуальными нарушениями. Ведёт арт-терапию, игровые занятия, группы общения, блоггинг.",
              areas: ["РАС", "ЗПР", "Арт-терапия", "АДК"],
            },
            {
              name: "Саша",
              slug: "sasha",
              role: "Педагог-тьютор — 4,5 года",
              langs: ["русский", "english"],
              bio: "Тьютор и педагог-психолог. Ведёт математику, английский, историю, ролевые игры и киноклуб.",
              areas: ["Математика", "English", "Ролевые игры", "КИНОКЛУБ"],
            },
          ].map((t) => (
            <div
              key={t.name}
              className="bg-surface border border-border rounded-2xl p-7 flex gap-5"
            >
              <div className="w-20 h-20 rounded-full bg-hover border-2 border-border flex items-center justify-center text-3xl font-bold text-textSecondary flex-shrink-0">
                {t.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{t.name}</h3>
                <p className="text-sm font-semibold text-accent mb-3">
                  {t.role}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {t.langs.map((l) => (
                    <span
                      key={l}
                      className="text-xs bg-hover border border-border px-2 py-1 rounded text-textSecondary"
                    >
                      {l}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-textSecondary mb-4 leading-relaxed">
                  {t.bio || "Этот педагог пока ничего о себе не написал"}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/teachers/${t.slug}`}
                    className="text-sm font-semibold bg-textPrimary text-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Страница педагога
                  </Link>
                  <Link
                    href="/children"
                    className="text-sm font-semibold bg-surface text-textPrimary border border-border px-4 py-2 rounded-lg hover:bg-hover transition-colors"
                  >
                    Курсы
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-border max-w-7xl mx-auto" />

      {/* Support CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-hover border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-3">Поддержать нас</h2>
          <p className="text-textSecondary mb-6 max-w-xl leading-relaxed">
            Мы рады любой помощи — финансовой или информационной. Расскажите о
            нас друзьям или переведите любую сумму. 40% пожертвований в конце
            месяца делится поровну между членами команды.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Поддержать
          </Link>
        </div>
      </section>

      <div className="h-px bg-border max-w-7xl mx-auto mb-16" />
    </div>
  );
}
