import { config, collection, singleton, fields } from "@keystatic/core";

const isLocal = process.env.NODE_ENV !== "production";

export default config({
  storage: isLocal
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: "bkmz2000",
          name: "auteam",
        },
      },
  ui: {
    brand: { name: "Нейроотличные нейроотличным" },
  },
  singletons: {
    globalSettings: singleton({
      label: "Настройки сайта",
      path: "content/global",
      format: { data: "json" },
      schema: {
        siteName: fields.text({ label: "Название сайта" }),
        siteDescription: fields.text({
          label: "Описание сайта",
          multiline: true,
        }),
        footerDescription: fields.text({
          label: "Описание в подвале",
          multiline: true,
        }),
        navHome: fields.text({ label: "Навигация: Главная" }),
        navAbout: fields.text({ label: "Навигация: О нас" }),
        navDropdown: fields.text({
          label: "Навигация: Выпадающее меню (заголовок)",
        }),
        navChildren: fields.text({ label: "Навигация: Детям" }),
        navTeens: fields.text({ label: "Навигация: Подросткам" }),
        navAdults: fields.text({ label: "Навигация: Взрослым" }),
        navParents: fields.text({ label: "Навигация: Родителям" }),
        navTeachers: fields.text({ label: "Навигация: Участники" }),
        navMaterials: fields.text({ label: "Навигация: Материалы" }),
        navNews: fields.text({ label: "Навигация: Новости" }),
        navJoin: fields.text({ label: "Навигация: Присоединиться" }),
        navContacts: fields.text({ label: "Навигация: Контакты" }),
      },
    }),
  },
  collections: {
    teachers: collection({
      label: "Участники",
      slugField: "slug",
      path: "content/teachers/*",
      format: { contentField: "body" },
      schema: {
        name: fields.text({
          label: "Имя",
          validation: { isRequired: true },
        }),
        slug: fields.text({ label: "Slug" }),
        languages: fields.array(fields.text({ label: "Язык" }), {
          label: "Языки",
          itemLabel: (props) => props.value || "Язык",
        }),
        totalExperience: fields.text({ label: "Общий опыт" }),
        education: fields.text({ label: "Образование", multiline: true }),
        certificates: fields.array(
          fields.object({
            cert: fields.text({ label: "Сертификат" }),
          }),
          {
            label: "Сертификаты",
            itemLabel: (props) => props.fields.cert.value || "Сертификат",
          }
        ),
        areasOfWork: fields.array(
          fields.object({
            area: fields.text({ label: "Направление" }),
          }),
          {
            label: "Сферы работы",
            itemLabel: (props) => props.fields.area.value || "Направление",
          }
        ),
        responsibilities: fields.text({ label: "Обязанности" }),
        resume: fields.text({ label: "Резюме", multiline: true }),
        otherExperience: fields.text({
          label: "Другой опыт",
          multiline: true,
        }),
        consultingTopics: fields.array(
          fields.object({
            topic: fields.text({ label: "Тема" }),
          }),
          {
            label: "Темы консультирования",
            itemLabel: (props) => props.fields.topic.value || "Тема",
          }
        ),
        interests: fields.text({ label: "Интересы" }),
        teachingStyle: fields.text({
          label: "Особенности преподавания",
          multiline: true,
        }),
        photos: fields.array(
          fields.object({
            photo: fields.image({
              label: "Фото",
              directory: "public/images/teachers",
              publicPath: "/images/teachers/",
            }),
          }),
          { label: "Фотографии" }
        ),
        isActive: fields.checkbox({ label: "Активен" }),
        body: fields.markdoc({
          label: "Биография",
          options: {
            image: {
              directory: "public/images/teachers",
              publicPath: "/images/teachers/",
            },
          },
        }),
      },
    }),

    courses: collection({
      label: "Курсы и занятия",
      slugField: "slug",
      path: "content/courses/*",
      format: { contentField: "body" },
      schema: {
        name: fields.text({
          label: "Название",
          validation: { isRequired: true },
        }),
        slug: fields.text({ label: "Slug" }),
        description: fields.text({ label: "Описание", multiline: true }),
        ageGroup: fields.select({
          label: "Возрастная группа",
          options: [
            { label: "Детям", value: "children" },
            { label: "Подросткам", value: "teens" },
            { label: "Взрослым", value: "adults" },
          ],
          defaultValue: "children",
        }),
        teacherName: fields.text({ label: "Имя педагога" }),
        pricing: fields.object(
          {
            price: fields.number({ label: "Цена" }),
            currency: fields.select({
              label: "Валюта",
              options: [
                { label: "RUB (₽)", value: "rub" },
                { label: "AMD (֏)", value: "amd" },
              ],
              defaultValue: "rub",
            }),
            convertedPrice: fields.number({ label: "Цена в другой валюте" }),
            convertedCurrency: fields.select({
              label: "Другая валюта",
              options: [
                { label: "RUB (₽)", value: "rub" },
                { label: "AMD (֏)", value: "amd" },
              ],
              defaultValue: "amd",
            }),
          },
          { label: "Цена" }
        ),
        format: fields.object(
          {
            type: fields.text({ label: "Тип (онлайн/офлайн)" }),
            duration: fields.number({ label: "Длительность (мин)" }),
            lessonsPerWeek: fields.number({ label: "Занятий в неделю" }),
            minAge: fields.number({ label: "Мин. возраст" }),
            maxAge: fields.number({ label: "Макс. возраст" }),
            maxStudents: fields.number({ label: "Макс. участников" }),
          },
          { label: "Формат" }
        ),
        schedule: fields.object(
          {
            days: fields.text({ label: "Дни" }),
            time: fields.text({ label: "Время" }),
          },
          { label: "Расписание" }
        ),
        location: fields.text({ label: "Место" }),
        photo: fields.object(
          {
            src: fields.image({
              label: "Фото",
              directory: "public/images/courses",
              publicPath: "/images/courses/",
            }),
            alt: fields.text({ label: "Alt текст" }),
          },
          { label: "Фото" }
        ),
        gallery: fields.array(
          fields.object({
            src: fields.image({
              label: "Фото",
              directory: "public/images/courses",
              publicPath: "/images/courses/",
            }),
            alt: fields.text({ label: "Alt текст" }),
          }),
          { label: "Галерея" }
        ),
        body: fields.markdoc({
          label: "Описание (подробное)",
          options: {
            image: {
              directory: "public/images/courses",
              publicPath: "/images/courses/",
            },
          },
        }),
      },
    }),

    news: collection({
      label: "Новости",
      slugField: "slug",
      path: "content/news/*",
      format: { contentField: "body" },
      schema: {
        title: fields.text({
          label: "Заголовок",
          validation: { isRequired: true },
        }),
        slug: fields.text({ label: "Slug" }),
        description: fields.text({
          label: "Краткое описание",
          multiline: true,
        }),
        image: fields.object(
          {
            src: fields.image({
              label: "Изображение",
              directory: "public/images/news",
              publicPath: "/images/news/",
            }),
            alt: fields.text({ label: "Alt текст" }),
          },
          { label: "Изображение" }
        ),
        date: fields.date({ label: "Дата" }),
        body: fields.markdoc({
          label: "Текст новости",
          options: {
            image: {
              directory: "public/images/news",
              publicPath: "/images/news/",
            },
          },
        }),
      },
    }),

    feedback: collection({
      label: "Отзывы",
      slugField: "slug",
      path: "content/feedback/*",
      format: "yaml",
      schema: {
        slug: fields.text({ label: "Slug" }),
        name: fields.text({
          label: "Имя",
          validation: { isRequired: true },
        }),
        body: fields.text({ label: "Отзыв", multiline: true }),
        rating: fields.object(
          {
            general: fields.number({ label: "Общее (1–5)" }),
            professionalism: fields.number({
              label: "Профессионализм (1–5)",
            }),
            recommend: fields.number({ label: "Рекомендация (1–5)" }),
          },
          { label: "Оценка" }
        ),
        relation: fields.text({ label: "Роль (родитель/студент)" }),
        date: fields.date({ label: "Дата" }),
      },
    }),

    categories: collection({
      label: "Категории",
      slugField: "slug",
      path: "content/categories/*",
      format: "yaml",
      schema: {
        name: fields.text({
          label: "Название",
          validation: { isRequired: true },
        }),
        slug: fields.text({ label: "Slug" }),
        description: fields.text({ label: "Описание", multiline: true }),
        icon: fields.object(
          {
            svg: fields.text({ label: "SVG код", multiline: true }),
            name: fields.text({ label: "Название иконки" }),
          },
          { label: "Иконка" }
        ),
        order: fields.number({ label: "Порядок сортировки" }),
      },
    }),

    materials: collection({
      label: "Материалы",
      slugField: "slug",
      path: "content/materials/*",
      format: { contentField: "body" },
      schema: {
        title: fields.text({
          label: "Заголовок",
          validation: { isRequired: true },
        }),
        slug: fields.text({ label: "Slug" }),
        description: fields.text({ label: "Описание", multiline: true }),
        body: fields.markdoc({
          label: "Содержимое",
          options: {
            image: {
              directory: "public/images/materials",
              publicPath: "/images/materials/",
            },
          },
        }),
        tags: fields.text({ label: "Теги (через запятую)" }),
        author: fields.text({ label: "Автор" }),
        publishedDate: fields.text({ label: "Дата публикации" }),
      },
    }),
  },
});
