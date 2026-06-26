# Anime & Manga List

A full-stack web app for browsing, searching, and inspecting anime and manga titles. The Go backend proxies the Jikan API (MyAnimeList), and the Next.js frontend renders ranked lists, search results, and detail pages with paginated navigation.

![Home page — top anime ranking](@images/Screenshot_20260626_162957.png)

## Features

- **Top rankings** — browse top anime and top manga with a category selector (`all`, `airing`, `upcoming`, `bypopularity`, `favorite` for anime; `manga` equivalents for manga) and offset-based pagination.
- **Search** — debounced query input that calls the backend's `/search` endpoint, with paginated results.
- **Detail pages** — anime and manga routes fetch full metadata from Jikan.
- **Full anime details** — a dedicated `/full/:id` endpoint that returns extended fields for the anime detail page (related entries, etc.).
- **CORS-configured API** — the backend reads `ALLOWED_ORIGINS` from env so the dev frontend on `localhost:3000` can call it.

## Tech Stack

| Layer    | Tech                                                                 |
|----------|----------------------------------------------------------------------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4        |
| Backend  | Go, Gin, `gin-contrib/cors`                                          |
| API      | [Jikan](https://jikan.moe/) (unofficial MyAnimeList REST API)        |
| Dev      | Docker Compose (hot-reload for both services), `air` for Go reload   |

## Project Structure

```
.
├── backend/                 # Go API server (Gin)
│   ├── main.go              # Entry point — loads env, mounts CORS, registers routes
│   ├── config/              # Env loading
│   ├── routes/              # /api/anime and /api/manga groups
│   ├── handlers/            # HTTP handlers (top, search, details, full)
│   ├── services/            # Jikan client + per-resource methods
│   ├── models/              # Response shapes
│   ├── Dockerfile.dev
│   └── go.mod / go.sum
├── frontend/                # Next.js 16 app
│   ├── app/
│   │   ├── page.tsx                 # Home — top anime
│   │   ├── layout.tsx               # Root layout + navbar
│   │   ├── components/              # Navbar, cards, search, pagination, selector
│   │   ├── lib/                     # api.ts (fetch wrappers), types, constants
│   │   ├── search/page.tsx          # Search page
│   │   ├── utils/                   # Date formatter
│   │   └── (details)/
│   │       ├── anime/[id]/page.tsx  # Anime detail (uses /full/:id)
│   │       └── manga/[id]/page.tsx  # Manga detail
│   ├── Dockerfile.dev
│   └── package.json
├── images/                  # Screenshots used in this README
└── docker-compose.dev.yml   # One-command dev stack
```

## Screenshots

**Home — top anime ranking with category selector**

![Top anime ranking](@images/Screenshot_20260626_162957.png)

**Search — debounced query with paginated results**

![Search page](@images/Screenshot_20260626_163038.png)

**Anime detail — full metadata**

![Anime detail page](@images/Screenshot_20260626_163112.png)

**Manga detail — extended metadata**

![Manga detail page](@images/Screenshot_20260626_163156.png)

**Full anime details — related entries section**

![Full anime details](@images/Screenshot_20260626_163226.png)

## API Reference

Base URL (dev): `http://localhost:8080/api`

### Anime

| Method | Path                  | Query params                         | Description                          |
|--------|-----------------------|--------------------------------------|--------------------------------------|
| GET    | `/anime/top`          | `ranking_type`, `offset`             | Top anime by ranking                 |
| GET    | `/anime/search`       | `q`, `offset`                        | Search anime by title                |
| GET    | `/anime/:id`          | —                                    | Anime summary                        |
| GET    | `/anime/full/:id`     | —                                    | Anime + related entries (full payload)|

### Manga

| Method | Path                  | Query params                         | Description                          |
|--------|-----------------------|--------------------------------------|--------------------------------------|
| GET    | `/manga/top`          | `ranking_type`, `offset`             | Top manga by ranking                 |
| GET    | `/manga/search`       | `q`, `offset`                        | Search manga by title                |
| GET    | `/manga/:id`          | —                                    | Manga summary                        |

The frontend wraps these in `frontend/app/lib/api.ts` as `getTop`, `getDetails`, and `search`.

## Running Locally

### With Docker Compose (recommended)

```bash
docker compose -f docker-compose.dev.yml up --build
```

- Frontend → http://localhost:3000
- Backend → http://localhost:8080

Both containers mount the source so edits hot-reload. The Go side uses `air`; the Next.js side uses the standard dev server.

### Without Docker

**Backend**

```bash
cd backend
# Required env:
#   CLIENT_ID        — passed through to Jikan (rate-limit client identifier)
#   ALLOWED_ORIGINS  — e.g. http://localhost:3000
export CLIENT_ID=your_client_id
export ALLOWED_ORIGINS=http://localhost:3000
go run .
```

**Frontend**

```bash
cd frontend
pnpm install
pnpm dev
```

`frontend/app/lib/api.ts` points at `http://localhost:8080/api`; change `API_BASE` if your backend lives elsewhere.

## Environment Variables

| Variable          | Where    | Purpose                                                        |
|-------------------|----------|----------------------------------------------------------------|
| `CLIENT_ID`       | backend  | Identifier forwarded to the upstream Jikan API                 |
| `ALLOWED_ORIGINS` | backend  | Comma-separated origins allowed by CORS                        |
| `NODE_ENV`        | frontend | Set to `development` by the compose file                       |

## Notes

- Jikan is rate-limited — the backend passes through errors as `502 Bad Gateway` if the upstream is unhappy.
- The Next.js project uses the App Router with a route group `(details)` to share layout between anime and manga detail pages.
- Tailwind v4 is configured via `@tailwindcss/postcss` (no `tailwind.config.js`).