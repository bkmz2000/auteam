import Link from "next/link";
import { AgeNav } from "../../components/AgeNav";
import { reader } from "../../../lib/reader";

function formatPrice(pricing: any): string {
  if (!pricing?.price) return "по договорённости";
  let result = `${pricing.price}`;
  if (pricing.currency) result += ` ${pricing.currency}`;
  if (pricing.convertedPrice && pricing.convertedCurrency) {
    result += ` / ${pricing.convertedPrice} ${pricing.convertedCurrency}*`;
  }
  return result;
}

function ageGroupLabel(ageGroup?: string): string {
  if (ageGroup === "children") return "Детям";
  if (ageGroup === "teens") return "Подросткам";
  if (ageGroup === "adults") return "Взрослым";
  return ageGroup || "";
}

export const dynamic = "force-dynamic";

export default async function AdultsPage() {
  let courses: any[] = [];
  try {
    const entries = await reader.collections.courses.all();
    courses = entries.map(({ entry }) => entry);
  } catch (e) {
    console.error("Error fetching courses:", e);
  }

  const filtered = courses.filter((c) => c.ageGroup === "adults");

  return (
    <div>
      <AgeNav />
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-textPrimary mb-3">
              Занятия для взрослых
            </h1>
            <p className="text-textSecondary text-lg max-w-2xl">
              Курсы, группы поддержки и консультации для взрослых клиентов 18+. Группы общения, равное консультирование, предметы по выбору.
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course) => (
                <div
                  key={course.slug}
                  className="bg-surface rounded-2xl p-6 shadow-sm border border-border group hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-accent bg-hoverSurface px-2 py-1 rounded-full">
                      {ageGroupLabel(course.ageGroup)}
                    </span>
                    {course.teacherName && (
                      <span className="text-xs text-textSecondary">{course.teacherName}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2 group-hover:text-accent transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-textSecondary text-sm mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  {course.pricing?.price && (
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base font-semibold text-textPrimary">
                          {formatPrice(course.pricing)}
                        </span>
                        {course.pricing?.convertedPrice && (
                          <p className="text-xs text-textSecondary mt-0.5">* курс примерный, может отличаться</p>
                        )}
                      </div>
                      <Link
                        href="/contacts"
                        className="text-sm font-medium text-accent hover:underline transition-colors"
                      >
                        Записаться →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-textSecondary">Курсы скоро появятся. Следите за новостями!</p>
            </div>
          )}

          <div className="mt-12 p-6 bg-hoverSurface rounded-2xl border border-border">
            <h2 className="text-xl font-semibold text-textPrimary mb-2">Не нашли подходящее?</h2>
            <p className="text-textSecondary mb-4">
              Расскажите, что вас интересует — мы постараемся подобрать решение.
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}