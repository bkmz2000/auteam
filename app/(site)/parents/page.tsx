import { AgeNav } from "../../components/AgeNav";

export default function ParentsPage() {
  return (
    <div>
      <AgeNav />
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-textPrimary mb-3">
              Родителям и опекунам
            </h1>
            <p className="text-textSecondary text-lg max-w-2xl">
              Ресурсы, поддержка и информация для родителей и опекунов нейроотличных детей и подростков.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-xl font-semibold text-textPrimary mb-4">Поддержка и сообщество</h2>
              <ul className="space-y-3 text-textSecondary">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Группы поддержки для родителей — регулярные встречи с равными консультантами
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Индивидуальные консультации по вопросам обучения и воспитания
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Ресурсы по AAC (альтернативной коммуникации) и сенсорной интеграции
                </li>
              </ul>
            </div>

            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-xl font-semibold text-textPrimary mb-4">Образовательные материалы</h2>
              <ul className="space-y-3 text-textSecondary">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Статьи о нейроотличности и методах поддержки
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Методические материалы для занятий дома
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#C4956A" }}></span>
                  Ссылки на полезные ресурсы и организации
                </li>
              </ul>
            </div>

            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-border md:col-span-2">
              <h2 className="text-xl font-semibold text-textPrimary mb-4">Как мы можем помочь</h2>
              <p className="text-textSecondary mb-6">
                Мы понимаем, что поддержка нейроотличного ребёнка — это большой труд. Наша команда состоит из нейроотличных специалистов, которые знают эти вызовы изнутри.
              </p>
              <p className="text-textSecondary">
                Свяжитесь с нами, чтобы обсудить потребности вашей семьи и подобрать подходящие занятия или консультации.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}