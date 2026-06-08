# next-movies

Поиск и просмотр информации о фильмах и сериалах через TMDB API.

## Стек

- **Next.js 16** (App Router, ISR, серверные компоненты)
- **MUI v6** + Emotion — компоненты и темизация (тёмная/светлая тема)
- **TypeScript** — строгий режим (`strict: true`)
- **Vitest** — unit/integration тесты (45 тестов)
- **Playwright** — E2E тесты (Chromium)

## Разработка

```bash
# Установка
npm install

# Запуск dev-сервера (с IPv4 DNS workaround)
npm run dev

# Сборка
npm run build

# Проверки
npm run lint          # ESLint 9 (flat config)
npm run typecheck     # tsc --noEmit
npm run format        # Prettier --write
npm run format:check  # Prettier --check

# Тесты
npm run test           # Vitest
npm run test:watch     # Vitest watch
npm run test:e2e       # Playwright (автостарт dev-сервера)
npm run test:e2e:ui    # Playwright UI mode
```

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните:

```bash
cp .env.example .env.local
```

| Переменная               | Описание                                                |
| ------------------------ | ------------------------------------------------------- |
| `REACT_APP_API_KEY`      | API-ключ TMDB (https://www.themoviedb.org/settings/api) |
| `NEXT_PUBLIC_URL_IMG`    | Базовый URL изображений TMDB                            |
| `NEXT_PUBLIC_ERROR_IMG_` | Fallback при ошибке загрузки изображения                |
| `NEXT_PUBLIC_URL`        | URL приложения (http://localhost:3000)                  |

## Архитектура

```
app/
├── page.tsx              # Главная (ISR, revalidate: 3600)
├── [slug]/page.tsx       # Список контента (movie/tv)
├── [slug]/[id]/page.tsx  # Детальная страница
├── search/[query]/       # Результаты поиска
├── api/
│   ├── detail/route.ts   # Прокси к TMDB Detail
│   ├── list/route.ts     # Прокси к TMDB Discover
│   └── search/route.ts   # Прокси к TMDB Search
├── loading.tsx           # Единый loading для всех сегментов
└── error.tsx             # Единый error boundary для всех сегментов
```

- **Серверные компоненты** (страницы) фетчат данные напрямую или делегируют клиентским компонентам
- **Клиентские компоненты** (`ContentList`, `Detail`) ходят через `/api/*` прокси
- **API-ключ** никогда не покидает сервер
- **Все запросы** имеют таймаут 8с и AbortSignal
- **Кэширование**: ISR 1 час на главной, `s-maxage=3600` на прокси
