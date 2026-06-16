"use client";

import { useState } from "react";

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", topic: "general", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Контакты</h1>
          <p className="text-xl text-textSecondary max-w-3xl">
            Свяжитесь с нами любым удобным способом. Мы рады ответить на вопросы и помочь!
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* General Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Свяжитесь с нами</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-hover text-accent flex items-center justify-center flex-shrink-0">
                      📧
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Email</div>
                      <a href="mailto:info@neurodiverse.am" className="text-accent hover:underline">
                        info@neurodiverse.am
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-hover text-accent flex items-center justify-center flex-shrink-0">
                      💬
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Telegram</div>
                      <a href="https://t.me/neurodiverse_am" className="text-accent hover:underline">
                        @neurodiverse_am
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-hover text-accent flex items-center justify-center flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Локация</div>
                      <div className="text-gray-900">Армения, Ереван</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-accent rounded-2xl p-6 text-textPrimary">
                <h2 className="text-xl font-bold mb-4">Поддержать проект</h2>
                <p className="text-textSecondary text-sm mb-4">
                  Мы будем признательны за любую помощь. Часть пожертвований (40%)
                  в конце месяца делится между членами команды.
                </p>
                <p className="text-sm">
                  Нам можно переводить деньги в любой валюте.
                </p>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Частые вопросы</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Как записаться на занятие?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Напишите нам или выберите педагога и свяжитесь с ним напрямую через его страничку.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Есть ли пробные занятия?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Да! Можно записаться на знакомство с педагогом или походить на занятия как стажёр.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Можно ли оплатить в рассрочку?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Спрашивайте — мы всегда готовы обсудить удобные условия.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Написать нам</h2>
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="text-4xl mb-2">✅</div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Сообщение отправлено!</h3>
                    <p className="text-green-700">Мы ответим вам в ближайшее время.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ваше имя
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder="Как вас зовут?"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Тема
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        <option value="general">Общий вопрос</option>
                        <option value="course">Вопрос о курсах</option>
                        <option value="enrollment">Запись на занятие</option>
                        <option value="cooperation">Сотрудничество</option>
                        <option value="feedback">Отзыв</option>
                        <option value="support">Поддержка проекта</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Сообщение
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                        placeholder="Напишите ваш вопрос или сообщение..."
                        required
                      />
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

              {/* Team Contact */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-md mt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Связаться с организаторами</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                      С
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Соня</div>
                      <div className="text-sm text-gray-500">Основатель проекта</div>
                      <a href="#" className="text-accent text-sm hover:underline">
                        Написать →
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                      С
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Саша</div>
                      <div className="text-sm text-gray-500">Организатор</div>
                      <a href="#" className="text-accent text-sm hover:underline">
                        Написать →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
