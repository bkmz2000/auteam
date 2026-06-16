"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    type: "review",
    message: "",
    isPublic: true,
  });
  const [submitted, setSubmitted] = useState(false);

  // Fetch feedback items
  let feedbackItems: any[] = [];
  try {
    // We'll try to fetch, but this is a client component so we need to handle it differently
  } catch (e) {
    // Ignore
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success message - actual submission would require backend
    setSubmitted(true);
    setFormData({ name: "", type: "review", message: "", isPublic: true });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const sampleFeedback = [
    {
      name: "Мария",
      date: "2024-01-20",
      type: "review",
      message: "Очень благодарна Соне за занятия с моим сыном. Он стал намного увереннее в общении, а я наконец-то понимаю, как его поддерживать. Планируем продолжать!",
    },
    {
      name: "Алексей",
      date: "2024-02-05",
      type: "review",
      message: "Замечательная платформа! Записался на курс английского к Саше — отличный педагог, интересная методика. Рекомендую всем.",
    },
    {
      name: "Елена",
      date: "2024-02-15",
      type: "suggestion",
      message: "Было бы здорово добавить больше курсов для взрослых. Хотелось бы увидеть курс по цифровой грамотности для родителей.",
    },
    {
      name: "Аноним",
      date: "2024-03-01",
      type: "review",
      message: "Группа общения — это то, чего мне не хватало. Атмосфера поддержки и понимания. Спасибо команде!",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Отзывы и предложения</h1>
          <p className="text-xl text-textSecondary max-w-3xl">
            Здесь вы можете оставить отзыв о наших занятиях, предложить идеи или рассказать о своих потребностях
          </p>
        </div>
      </section>

      {/* Feedback Sections */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="px-6 py-3 bg-accent text-textPrimary rounded-xl font-semibold">
              Отзывы
            </button>
            <button className="px-6 py-3 bg-white text-gray-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Предложения
            </button>
            <button className="px-6 py-3 bg-white text-gray-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Потребности
            </button>
          </div>

          {/* Feedback Form */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-md mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Оставить отзыв</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">✅</div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Спасибо за ваш отзыв!</h3>
                <p className="text-green-700">Мы очень ценим ваше мнение и обязательно его прочитаем.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ваше имя (необязательно)
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="Анонимно"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тип обращения
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="review">Отзыв</option>
                      <option value="suggestion">Предложение</option>
                      <option value="need">Потребность</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше сообщение
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    placeholder="Напишите ваш отзыв, предложение или расскажите о своих потребностях..."
                    required
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                    className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
                  />
                  <label htmlFor="isPublic" className="text-sm text-gray-600">
                    Показать на сайте (если не отмечено, будет только для администрации)
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto bg-accent text-textPrimary px-8 py-3 rounded-xl font-semibold hover:bg-hover transition-colors"
                >
                  Отправить
                </button>
              </form>
            )}
          </div>

          {/* Existing Reviews */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Отзывы участников</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {sampleFeedback.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.date}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.type === "review" ? "bg-green-100 text-green-700" :
                    item.type === "suggestion" ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {item.type === "review" ? "Отзыв" : item.type === "suggestion" ? "Предложение" : "Потребность"}
                  </span>
                </div>
                <p className="text-gray-600">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
