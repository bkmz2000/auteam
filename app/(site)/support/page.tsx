import { AgeNav } from "../../components/AgeNav";

export default function SupportPage() {
  return (
    <div>
      <AgeNav />
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-textPrimary mb-3">
              Поддержать нас
            </h1>
            <p className="text-textSecondary text-lg max-w-2xl">
              Существует несколько способов поддержать нашу работу и помочь нейроотличным людям и их близким в Армении.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Financial support */}
            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-border">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "#F4F1EC" }}
              >
                <svg className="w-6 h-6" style={{ color: "#C4956A" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-textPrimary mb-3">Финансовая поддержка</h2>
              <p className="text-textSecondary mb-4">
                Вы можете поддержать нашу работу любой суммой. Это помогает нам продолжать деятельность, организовывать занятия и поддерживать специалистов.
              </p>
              <ul className="space-y-2 text-textSecondary mb-6">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Оплата курсов для семей с ограниченными возможностями
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Развитие и поддержка платформы
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Обучение и супервизия педагогов
                </li>
              </ul>
              <p className="text-sm text-textSecondary italic">
                Для обсуждения условий финансовой поддержки свяжитесь с нами.
              </p>
            </div>

            {/* Informational support */}
            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-border">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "#F4F1EC" }}
              >
                <svg className="w-6 h-6" style={{ color: "#C4956A" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-textPrimary mb-3">Информационная поддержка</h2>
              <p className="text-textSecondary mb-4">
                Помогите распространить информацию о нас — многие семьи в Армении не знают, что такая поддержка существует.
              </p>
              <ul className="space-y-2 text-textSecondary mb-6">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Расскажить о нас друзьям и знакомым
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Поделиться нашими материалами в соцсетях
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Рекомендовать нас специалистам и организациям
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-hoverSurface rounded-2xl p-8 border border-border text-center">
            <h2 className="text-xl font-semibold text-textPrimary mb-3">Хотите узнать больше?</h2>
            <p className="text-textSecondary mb-6">
              Свяжитесь с нами, чтобы обсудить любые вопросы о поддержке нашей работы.
            </p>
            <a
              href="/contacts"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Связаться
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}