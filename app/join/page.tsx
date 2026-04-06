import Link from "next/link";

export default function JoinPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-violet-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Хочу в команду!</h1>
          <p className="text-xl text-violet-100 max-w-3xl">
            Присоединяйтесь к нам! Мы ищем нейроотличных педагогов, специалистов и волонтёров
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Text */}
            <div className="lg:col-span-2 space-y-8">
              {/* Who We Looking For */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Кого мы ищем</h2>
                <p className="text-gray-600 mb-4">
                  Мы принимаем педагогов в команду от 14 лет (если вам меньше, но вы круты — пишите тоже).
                  Можно присоединиться к любому из имеющихся направлений или предложить своё.
                </p>
                <p className="text-gray-600 mb-4">
                  Направление может не совпадать по формату с теми, которые уже есть на сайте.
                  Например, вы можете вести чат, говорить по телефону, параллельно играть в игру, смотреть фильм и пр.
                </p>
                <div className="bg-violet-50 rounded-xl p-4">
                  <p className="text-violet-700 font-medium">
                    💡 Вы можете присоединиться, даже если не говорите устно,
                    но свободно используете средства АДК — вы нам очень нужны!
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Требования</h2>
                <ul className="space-y-3">
                  {[
                    "Релевантный личный опыт (вы нейроотличный человек или его близкий друг/родственник)",
                    "Умение или желание работать онлайн как педагог/ведущий/лектор/помогающий специалист",
                    "Приветствуется опыт и/или обучение в выбранной области",
                    "Если вы врач или психолог/психотерапевт — нужно образование",
                    "Искренний и сильный интерес к работе",
                    "Уважение и симпатия к другим нейроотличным людям и их родственникам",
                    "По возможности квир-френдли",
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="text-violet-500 mt-1">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-500 text-sm mt-4">
                  Также не стесняйтесь писать, если у вас есть особенности речи/общения
                  или вы считаете, что выглядите "как-то не так". Мы позаботимся о подборе адекватных клиентов.
                </p>
              </div>

              {/* Conditions */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Условия и оплата</h2>
                <ul className="space-y-3">
                  {[
                    "Вы получаете оплату за занятия, которую устанавливаете сами",
                    "К стоимости добавляется 500 рублей в пользу организации (для налогов и нужд проекта)",
                    "Оформление: официальное в Армении (ООО)",
                    "Неоплачиваемый отпуск — когда угодно, просто напишите",
                    "Оплачиваемый отпуск — 56 дней в году после трёх месяцев работы",
                    "График в любое удобное время, главное — соблюдать регулярность",
                    "Штрафов нет, но все расстраиваются 😅",
                  ].map((cond, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="text-violet-500 mt-1">•</span>
                      {cond}
                    </li>
                  ))}
                </ul>
                <div className="bg-amber-50 rounded-xl p-4 mt-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Про донаты:</strong> Если проводите что-либо за донат — от них ничего не вычитается,
                    если сумма меньше 700 рублей. Если больше — пожалуйста, выделите часть на поддержку организации.
                  </p>
                </div>
              </div>

              {/* Selection Process */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Как попасть в команду</h2>
                <p className="text-gray-600 mb-6">
                  Отбор проходит в два этапа:
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-600 font-bold flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Собеседование</h3>
                      <p className="text-gray-600 text-sm">
                        Собеседование с организатором/организаторами — знакомство, обсуждение ваших интересов и опыта
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-600 font-bold flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Пробное занятие</h3>
                      <p className="text-gray-600 text-sm">
                        Проведение/демонстрация пробного занятия (любого по одной из тем, какую хотите брать)
                        организатору и/или другому сотруднику, примерно на 30 минут
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-2">Готовы присоединиться?</h3>
                <p className="text-violet-100 text-sm mb-6">
                  Заполните небольшую анкету — мы свяжемся с вами для собеседования
                </p>
                <button className="w-full bg-white text-violet-600 px-6 py-3 rounded-xl font-semibold hover:bg-violet-50 transition-colors">
                  Заполнить анкету
                </button>
                <p className="text-violet-200 text-xs mt-4 text-center">
                  Мы хорошие, с нами приятно иметь дело! 🤗
                </p>
              </div>

              {/* Languages Info */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Языки</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Можно присоединиться, если вы говорите на:
                </p>
                <ul className="space-y-2">
                  {["Русском", "Армянском", "Английском", "И других языках!"].map((lang, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="text-violet-500">✓</span>
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Vacancies */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Другие вакансии</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Мы также ищем:
                </p>
                <ul className="space-y-2">
                  {[
                    "Юрист (разовые консультации, проверка документов)",
                    "Бухгалтер",
                    "Менеджер по продажам",
                  ].map((vacancy, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="text-violet-500">•</span>
                      {vacancy}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-500 text-xs mt-3">
                  Пока на полуволонтёрских началах, но со временем будет лучше!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
