# next-movies — agent instructions

## Commands

```sh
npm run dev            # dev server with IPv4 DNS workaround
npm run build          # production build (TS errors **will** fail)
npm run lint           # ESLint 9 (flat config, next/core-web-vitals)
npm run typecheck      # tsc --noEmit
npm run format         # Prettier --write
npm run format:check   # Prettier --check
npm run test           # Vitest run
npm run test:watch     # Vitest watch
npm run test:e2e       # Playwright E2E (starts dev server)
npm run test:e2e:ui    # Playwright in UI mode
```

## Structure

- No `src/` dir — code lives at root
- `app/` — Next.js 16 App Router (routes: `/`, `/[slug]`, `/[slug]/[id]`, `/search/[query]`)
- `app/api/` — three proxy routes to TMDB (`detail`, `list`, `search`)
- `components/` — MUI v6 + Emotion styled components
- `helpers/` — data fetching (`getContent.ts`) and utilities
- `types/` — TypeScript interfaces (`IContent`, `IListResponse`, `IDetailResponse`, etc.)
- `__tests__/` — Vitest unit/integration tests (46 tests across 13 files)
- `e2e/` — Playwright E2E tests
- Path alias `@/*` maps to project root

## Config quirks

- `tsconfig.json`: `strict: true`, `moduleResolution: bundler`, `jsx: react-jsx`
- `next.config.js`: CORS headers on `/api/*`
- ESLint 9 flat config at `eslint.config.mjs`
- Prettier configured via `.prettierrc` (two-space, single quotes, trailing commas)
- `package.json` has `overrides.postcss: ">=8.5.10"` for security fix
- `playwright.config.ts` uses `webServer` to auto-start dev server

## Data flow

TMDB content is proxied through Next.js API routes (`/api/list`, `/api/detail`, `/api/search`) rather than called directly from client components. API routes set `Cache-Control: public, s-maxage=3600, stale-while-revalidate=600`. Server-side metadata fetches call TMDB directly.

## Theme

- `components/ThemeRegistry/ThemeRegistry.tsx` — MUI `ThemeProvider` with dark/light mode state + `CssBaseline`
- `components/ThemeToggle/ThemeToggle.tsx` — toggle button using `useThemeMode()`
- Dark mode: `#06246f` bg, `#1240AB` primary
- Light mode: `#f0f2f5` bg, white paper

## Dependencies worth knowing

- **MUI v6** with Emotion (`@emotion/react`, `@emotion/styled`, `@emotion/cache`)
- **framer-motion v12** previously used, replaced with CSS animations
- **Vitest v4** for unit/integration tests (jsdom environment)
- **Playwright** for E2E tests (Chromium installed)
