# SPEC.md — Нейроотличные нейроотличным

> Внутренний рабочий документ для разработки и ведения проекта.
> Основан на документе Сони «Нейроотличные нейроотличным».

---

## 1. Concept & Vision

**Название:** Нейроотличные нейроотличным
**URL:** https://tina-cloudflare.vercel.app
**Основа:** Платформа для нейроотличных детей, подростков, взрослым и их близких в Армении. Создана нейроотличным педагогом Соней при участии Саши.

**Миссия:** Приближаться к инклюзивному, самонаправленному и (в идеале) самоуправляемому обществу. Нейроотличные люди и их близкие могут здесь официально зарабатывать, находить понимающих специалистов, получать поддержку и обмениваться опытом.

** tono:** Тёплый, профессиональный, принимающий. Без корпоративного языка. Честный и открытый.

---

## 2. Design Language

### Pallette
- **Background:** ivory white (`#FDFCF9`)
- **Surface/Cards:** white (`#FFFFFF`)
- **Border/Divider:** warm gray (`#E8E4DF`)
- **Text primary:** dark charcoal (`#1A1A1A`)
- **Text secondary:** medium gray (`#6B6560`)
- **Accent:** muted terracotta / warm amber (`#C4956A`) — used sparingly for links, active states, highlights
- **Hover surface:** light warm gray (`#F4F1EC`)

### Typography
- Headings: `"Segoe UI", system-ui, sans-serif` — clean, no personality cult
- Body: same stack
- Sizes: fluid, modular scale
- **No emojis in UI chrome** — content can have them if teacher adds them

### Spatial System
- Generous whitespace — calm, not cramped
- Card-based layouts for courses and teachers
- Consistent padding: 16px base unit

### Motion
- Minimal: subtle fade on hover (150ms), no bouncing or sliding
- Respect `prefers-reduced-motion`

### Visual Assets
- No emoji in headers/navigation
- Icons: Lucide or similar minimal line icons
- Teacher photos: real, friendly — no stock photos

---

## 3. Site Structure

### Navigation (top-level sections)
```
Главная
О нас
Детям
Подросткам
Взрослым
Родителям
Педагоги
Хочу в команду
Материалы
Новости
Контакты
```

> Примечание: курсы отображаются внутри возрастных разделов, а не как отдельный пункт меню.

### Pages

| Route | Описание | TinaCMS |
|-------|----------|---------|
| `/` | Главная — краткое представление платформы | PageCollection |
| `/about` | О нас — миссия, принципы, организаторы, финансы | PageCollection |
| `/children` | Детям — курсы для детей | PageCollection + курсы |
| `/teens` | Подросткам — курсы для подростков | PageCollection + курсы |
| `/adults` | Взрослым — курсы и группы для взрослых | PageCollection + курсы |
| `/parents` | Родителям — поддержка, ресурсы для родителей и опекунов | PageCollection |
| `/teachers` | Список педагогов, ссылка на страницу каждого | TeacherCollection |
| `/teachers/[slug]` | Страница педагога — биография, курсы, подход, равное консультирование | TeacherCollection |
| `/news` | Новости | NewsCollection |
| `/news/[slug]` | Новость | NewsCollection |
| `/feedback` | Книга отзывов и предложений | FeedbackCollection |
| `/materials` | Открытые материалы — статьи, методички, ссылки | MaterialsCollection |
| `/join` | Хочу в команду — открытые вакансии, условия, форма | PageCollection |
| `/contacts` | Контакты | PageCollection |
| `/support` | Поддержать нас (финансово и информационно) | PageCollection |

### TinaCMS Collections

| Collection | Путь | Описание |
|------------|------|---------|
| `pages` | `content/pages/` | Статические страницы (home, about, join, contacts, support, children, teens, adults) |
| `teachers` | `content/teachers/` | Профили педагогов |
| `courses` | `content/courses/` | Курсы |
| `categories` | `content/categories/` | Категории курсов |
| `news` | `content/news/` | Новости |
| `feedback` | `content/feedback/` | Отзывы и предложения |
| `materials` | `content/materials/` | Статьи с вложениями (для Open Library) |

---

## 4. Content Model

### Teacher (fields)
```
- name: string
- slug: string
- languages: string[] (e.g. ["русский", "английский B1"])
- totalExperience: string (e.g. "9,5 лет")
- education: object[] (учебное заведение, специальность, годы)
- certificates: string[]
- areasOfWork: string[] (сферы работы с возрастом клиентов)
- responsibilities: string
- resume: string (ссылка на резюме)
- otherExperience: string
- consultingTopics: string[] (темы для равного консультирования)
- interests: string
- teachingStyle: string
- photos: string[] (url фото)
- isActive: boolean
```

### Course (fields)
```
- name: string
- slug: string
- category: string (ссылка на категорию)
- description: string
- ageGroup: string (children | teens | adults)  ← обязательное поле
- teacherName: string
- pricing: object { price, currency ("rub" | "amd"), convertedPrice, convertedCurrency }
- schedule: object { days, time, location }
- format: object { type, duration, lessonsPerWeek, minAge, maxAge, maxStudents }
- body: string (markdown content)
```

> Pricing note: `price` — основная сумма, `currency` — основная валюта. `convertedPrice` + `convertedCurrency` — конвертация с примерным курсом. Конвертированная цена выводится со сноской: "* курс примерный, может отличаться".

### Material (fields)
```
- title: string
- slug: string
- description: string
- body: string (markdown content)
- attachments: object[] { title, url }
- tags: string[]
- author: string (teacher name)
- publishedDate: string (ISO date)
```

### Page (fields)
```
- title: string
- slug: string
- body: string (markdown)
- sections: object[] (optional, for multi-section pages)
```

---

## 5. Course Catalog Structure

Courses are organized by **age group** → **category** → **course**.

Age groups:
- **Детям** — дети примерно 5–12 лет
- **Подросткам** — подростки примерно 12–17 лет
- **Взрослым** — взрослые клиенты 18+
- **Родителям** — ресурсы и поддержка для родителей и опекунов

Внутри возрастных групп категории:
- Сопровождение в обучении (тьюторское)
- Репетиторство по предметам
- Группы общения и поддержки
- Мастерские и творчество
- Помогающие занятия
- Равное консультирование
- Предметы по выбору (английский, музыка и пр.)

---

## 6. Specific Design Notes

### Colors (Tailwind tokens)
```js
background: 'warm50', // #FDFCF9
surface: 'white',
border: 'warm200', // #E8E4DF
textPrimary: 'gray900', // #1A1A1A
textSecondary: 'warm500', // #6B6560
accent: 'amber', // #C4956A
hoverSurface: 'warm100', // #F4F1EC
```

### Typography
- Font stack: `"Segoe UI", system-ui, -apple-system, sans-serif`
- No custom fonts — keep it simple
- Body: 16px base, line-height 1.6
- Headings: font-weight 600

### No emojis in UI
- Navigation: text labels only
- Section headers: text only
- If a teacher writes content with emojis — that's their choice, not ours

---

## 7. Current State vs Target

### Already exists
- Главная, О нас, Курсы, Педагоги, Материалы, Новости, Отзывы, Хочу в команду, Контакты
- TinaCMS collections: pages, teachers, courses, categories, news, feedback
- Login + password protection for /admin

### Needs work
- **Rebranding**: "АутИмя" → "Нейроотличные нейроотличным"
- **New sections**: Children, Teens, Adults pages (age-grouped course listings)
- **Teacher profiles**: expand to match spec's detailed format (education, consulting topics, interests, teaching style)
- **Course content**: populate from spec's detailed course descriptions with pricing
- **Support page**: financial + informational support options
- **Design refresh**: calm ivory/gray palette, no purple gradients, no emojis in UI
- **Home page**: rewrite to match spec's warm, mission-driven copy

### Not in nearest scope
- Armenian / English translations
- Payment system integration
- AAC-specific UX features
- Booking system

---

## 8. Workflow

1. **Prototype** — implement this spec on the existing Tina Cloudflare codebase
2. **Review with Sonya** — she checks content, layout, and copy
3. **Sonya edits content herself** — she uses `/admin` (password-protected) to update pages, courses, teacher profiles
4. **Polish** — based on feedback, adjust design and content

### TinaCMS editing
- Соня и Саша заходят на `/admin`, вводят пароль
- Редактируют страницы, курсы, профили педагогов
- Изменения коммитятся в GitHub → Vercel деплоит автоматически

### Env vars (production)
```
TINA_PUBLIC_IS_LOCAL=true
TINA_ADMIN_PASSWORD=<password>
NEXTAUTH_SECRET=<secret>
GITHUB_PERSONAL_ACCESS_TOKEN=<token>
```

---

## 9. Team Contacts

| Имя | Роль |
|-----|------|
| Соня (София Стасевич) | Основатель, главный педагог, нейроотличный специалист |
| Саша (Александр Гончаров) | Педагог-тьютор, соорганизатор |

---

## 10. Open Questions

- [x] "Материалы" — статьи с произвольными вложениями (файлы, ссылки)
- [x] Цены — указываются в рублях (rub) или драмах (amd); конвертация по примерному курсу, конвертированная сумма содержит сноску "* курс примерный, может отличаться"
