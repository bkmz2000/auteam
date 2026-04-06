export default function MaterialsPage() {
  const sections = [
    {
      title: "Тексты педагогов и участников",
      description: "Статьи, заметки и исследования от нашей команды и участников",
      icon: "📝",
      color: "from-blue-400 to-cyan-500",
      items: [
        "Опыт нейроотличного педагога",
        "Истории успеха участников",
        "Методические заметки",
        "Исследовательские работы",
      ],
    },
    {
      title: "Документы",
      description: "Учебные планы, лицензии и официальные документы",
      icon: "📄",
      color: "from-green-400 to-emerald-500",
      items: [
        "Учебные планы курсов",
        "Лицензия образовательной организации",
        "Договоры и соглашения",
        "Регламенты работы",
      ],
    },
    {
      title: "Методички",
      description: "Методические материалы для педагогов и специалистов",
      icon: "📚",
      color: "from-amber-400 to-orange-500",
      items: [
        "Методические пособия",
        "Сборники упражнений и игр",
        "Программы занятий",
        "Рекомендации по работе",
      ],
    },
    {
      title: "Открытые доклады",
      description: "Лекции и доклады наших педагогов",
      icon: "🎤",
      color: "from-pink-400 to-rose-500",
      items: [
        "Доклад про асексуальность",
        "Лекция о нейроразнообразии",
        "Выступления на конференциях",
        "Записи вебинаров",
      ],
    },
    {
      title: "Видео и аудио",
      description: "Видеозаписи лекций, песни и отрывки занятий",
      icon: "🎬",
      color: "from-red-400 to-pink-500",
      items: [
        "Лекции и вебинары",
        "Песни",
        "Отрывки занятий",
        "Записи групп общения",
      ],
    },
    {
      title: "Полезные ссылки",
      description: "Подборка полезных ресурсов и сайтов",
      icon: "🔗",
      color: "from-violet-400 to-purple-500",
      items: [
        "Гранты и фонды для НКО",
        "Полезные статьи",
        "Организации по поддержке",
        "Образовательные ресурсы",
      ],
    },
    {
      title: "Библиотека",
      description: "Книги и материалы для чтения",
      icon: "📖",
      color: "from-indigo-400 to-blue-500",
      items: [
        "Рекомендуемая литература",
        "Книги о нейроразнообразии",
        "Пособия для родителей",
        "Специальная литература",
      ],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-violet-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Открытые материалы</h1>
          <p className="text-xl text-violet-100 max-w-3xl">
            Делимся знаниями и опытом. Здесь вы найдёте тексты, документы, методички,
            доклады, видео и многое другое.
          </p>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {section.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {section.description}
                </p>
                <ul className="space-y-1">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="text-violet-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grants Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Гранты и фонды</h2>
            <p className="text-gray-600 mb-6">
              Вот несколько фондов и грантов, куда можно обратиться за поддержкой:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "IDEA", url: "https://www.idea.am/ru/" },
                { name: "Ника Фонд", url: "https://nikafund.am/ru/glavnaya/" },
                { name: "Фонд Степана Гишяна", url: "https://arka.am/news/business/fond-stepan-gishyan-nachal-sbor-grantovykh-zayavok-na-2025-god/" },
                { name: "Фонд Альберта Тамберджи", url: "https://www.soar-us.org/ru/" },
              ].map((grant) => (
                <a
                  key={grant.name}
                  href={grant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-xl">🔗</span>
                  <span className="text-violet-600 font-medium hover:underline">{grant.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
