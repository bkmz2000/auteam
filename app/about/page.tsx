import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">О нас</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-textPrimary mb-6">О нас</h1>
          <p className="text-xl text-textSecondary max-w-3xl">
            Платформа для нейроотличных детей, подростков, взрослых, а также их близких родственников или друзей в Армении
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-textPrimary mb-6">Наша миссия</h2>
            <div className="prose prose-lg text-textSecondary">
              <p className="mb-4">
                Платформу основал педагог Соня — нейроотличный помогающий специалист. Соня использует они/их (they/them) pronouns.
                Здесь нейроотличные люди и их близкие могут:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Официально зарабатывать на том, что любят</li>
                <li>Нейроотличные специалисты помогать нейроотличным клиентам всех возрастов</li>
                <li>Нейроотличные клиенты найти понимающих специалистов с похожим опытом</li>
                <li>Нейроотличные эмигранты закрепиться в Армении</li>
                <li>Все обменяться знаниями и опытом</li>
              </ul>
              <p className="mb-4">
                Мы верим в инклюзивное, самонаправленное и самоуправляемое общество.
                Насколько мы знаем, в мире ещё не было похожих проектов — у вас есть шанс попасть в историю!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-textPrimary mb-12 text-center">Наши принципы</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Инклюзивность",
                description: "Мы рады педагогам и участникам с нарушениями речи, использующим альтернативную коммуникацию (АДК) и работающим с личными помощниками",
                icon: "🤝",
              },
              {
                title: "Многоязычность",
                description: "Занятия на русском, армянском и английском языках. Можно начать набирать участников на других языках",
                icon: "🌍",
              },
              {
                title: "Квир-френдли",
                description: "Мы открыты и дружелюбны ко всем людям независимо от их гендерной идентичности и сексуальной ориентации",
                icon: "🏳️‍🌈",
              },
              {
                title: "Компетентность",
                description: "У нас большой опыт в наших областях. Если опыт небольшой — вам это честно расскажут",
                icon: "💪",
              },
              {
                title: "Поддержка",
                description: "Нейроотличные люди и их близкие могут найти поддержку, сообщество и равных консультантов",
                icon: "❤️",
              },
              {
                title: "Разнообразие",
                description: "У нас есть миллион разных занятий — от репетиторства до анимации и ролевых игр",
                icon: "✨",
              },
            ].map((principle) => (
              <div key={principle.title} className="bg-surface rounded-2xl p-6 border border-border">
                <div className="text-4xl mb-4">{principle.icon}</div>
                <h3 className="text-xl font-bold text-textPrimary mb-2">{principle.title}</h3>
                <p className="text-textSecondary text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment System */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-textPrimary mb-6">Система оплаты</h2>
            <div className="bg-background rounded-2xl p-6 mb-6 border border-border">
              <p className="text-textSecondary">
                <strong>Цены педагоги устанавливают сами</strong>, поэтому они разнятся.
                Мы добавляем к стоимости занятий <strong>500 рублей</strong> в пользу организации
                для оплаты налогов и нужд проекта.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-textSecondary">
                Педагоги по своему желанию могут не брать деньги с отдельных групп населения
                (например, с людей из зоны боевых действий). В этом случае наценка от организации не взимается.
              </p>
              <p className="text-textSecondary">
                В будущем планируем перейти на "прогрессирующие налоги" — разные проценты в зависимости
                от заработка. Мы также открыты для финансовой помощи — часть пожертвований (40%) в конце месяца
                делится поровну между всеми членами команды.
              </p>
              <p className="text-textSecondary">
                Также из пожертвований мы сможем пускать людей в ситуации бедности или другой уязвимости
                на занятия бесплатно или со скидкой.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 lg:py-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-textPrimary mb-4">Поддержите наш проект</h2>
          <p className="text-xl text-textSecondary mb-8 max-w-2xl mx-auto">
            Любая помощь важна — финансовая или информационная. Расскажите о нас друзьям!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
