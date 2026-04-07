import Link from "next/link";
import { client } from "../../../tina/__generated__/databaseClient";

export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export default async function TeacherPage({ params }: PageProps) {
  let teacher: any = null;
  try {
    const res = await client.queries.teacher({ relativePath: `${params.slug}.md` });
    teacher = res.data.teacher;
  } catch (e) {
    // Try alternate slug format
    try {
      const res = await client.queries.teacherConnection({ first: 20 });
      const teachers = res.data.teacherConnection?.edges?.map((e: any) => e.node) || [];
      teacher = teachers.find((t: any) => t.slug === params.slug);
    } catch (e2) {
      console.error("Error fetching teacher:", e2);
    }
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Педагог не найден</h1>
          <Link href="/teachers" className="text-accent hover:underline">
            ← Вернуться к списку педагогов
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link
            href="/teachers"
            className="inline-flex items-center gap-2 text-textSecondary hover:text-textPrimary mb-6 transition-colors"
          >
            ← Назад к педагогам
          </Link>
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center text-4xl font-bold">
              {teacher.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">{teacher.name}</h1>
              <p className="text-xl text-textSecondary mb-4">{teacher.totalExperience}</p>
              <div className="flex flex-wrap gap-2">
                {(teacher.languages || []).map((lang: any, i: number) => (
                  <span key={i} className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    {typeof lang === 'string' ? lang : lang.lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              {teacher.body && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">О себе</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 whitespace-pre-wrap">{teacher.body}</p>
                  </div>
                </div>
              )}

              {/* Areas of Work */}
              {teacher.areasOfWork && teacher.areasOfWork.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Сферы работы</h2>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {(teacher.areasOfWork || []).map((area: any, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <span className="text-accent mt-1">•</span>
                        {typeof area === 'string' ? area : area.area}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Consulting Topics */}
              {teacher.consultingTopics && teacher.consultingTopics.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Темы равного консультирования</h2>
                  <div className="flex flex-wrap gap-2">
                    {(teacher.consultingTopics || []).map((topic: any, i: number) => (
                      <span key={i} className="text-sm bg-background text-accent px-3 py-1 rounded-full">
                        {typeof topic === 'string' ? topic : topic.topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Teaching Style */}
              {teacher.teachingStyle && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Особенности преподавания</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">{teacher.teachingStyle}</p>
                </div>
              )}

              {/* Other Experience */}
              {teacher.otherExperience && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Другой опыт</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">{teacher.otherExperience}</p>
                </div>
              )}

              {/* Photos */}
              {teacher.photos && teacher.photos.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Фотографии</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {(teacher.photos || []).map((photo: any, i: number) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={typeof photo === 'string' ? photo : photo.photo}
                          alt={`${teacher.name} photo ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Education */}
              {teacher.education && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Образование</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap">{teacher.education}</p>
                </div>
              )}

              {/* Certificates */}
              {teacher.certificates && teacher.certificates.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Сертификаты</h3>
                  <ul className="space-y-2">
                    {(teacher.certificates || []).map((cert: any, i: number) => (
                      <li key={i} className="text-gray-600 text-sm">
                        • {typeof cert === 'string' ? cert : cert.cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {teacher.responsibilities && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Обязанности</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap">{teacher.responsibilities}</p>
                </div>
              )}

              {/* Resume */}
              {teacher.resume && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Резюме</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap">{teacher.resume}</p>
                </div>
              )}

              {/* Interests */}
              {teacher.interests && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Интересы и хобби</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap">{teacher.interests}</p>
                </div>
              )}

              {/* CTA */}
              <div className="bg-accent rounded-2xl p-6 text-textPrimary">
                <h3 className="text-lg font-bold mb-2">Записаться на занятие</h3>
                <p className="text-textSecondary text-sm mb-4">
                  Запишитесь на знакомство или пробное занятие с {teacher.name?.split(' ')[0]}
                </p>
                <Link
                  href="/contacts"
                  className="block w-full text-center bg-surface text-accent px-4 py-3 rounded-xl font-semibold hover:bg-hover transition-colors"
                >
                  Связаться
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
