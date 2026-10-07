# ShortKing 👑

> **"Long URLs don't stand a chance."**

ShortKing is a production-grade, developer-focused URL-shortening platform inspired by Bitly and TinyURL, engineered with a modern dark-first UI, high-performance redirect architecture, real-time analytics, custom vanity aliases, and QR codes.

---

## ⚡ Features

- **Blazing Fast Redirects**: Sub-millisecond URL resolution with low-latency redirection (HTTP 302/307).
- **Collision-Resistant Base62 Generation**: Cryptographically secure short code generator with configurable length.
- **Custom Aliases**: Brand your links with custom vanity URLs (`/github`, `/docs`, etc.) with collision and reserved keyword protection.
- **Expiration Dates**: Set automatic sunset dates for temporary links.
- **Dynamic QR Code Generation**: Instantly generate and export downloadable PNG QR codes for any link.
- **Privacy-Conscious Analytics**: Track click volume over time, referrer sources, device breakdowns, browsers, and country metrics without harvesting raw PII (HMAC-SHA256 hashed IPs).
- **Row Level Security (RLS)**: Isolated per-user data governance powered by Supabase Auth and PostgreSQL policies.
- **Developer-First REST API**: Standardized JSON responses (`{ success: true, data }`) ready for programmatic link shortening.
- **Resilient Fallback**: Optional Redis cache layer with automatic fallback to PostgreSQL or in-memory storage.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: React 19, TypeScript
- **Styling**: Tailwind CSS (Dark-first aesthetic)
- **Icons & QR**: Lucide React & QRCode Canvas / SVG

### Backend

- **Server**: Node.js & [Fastify](https://fastify.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Architecture**: Layered architecture (Routes → Controllers → Services → Repositories → Database)
- **Cache**: Redis / Upstash with graceful offline degradation

### Database & Auth

- **Database**: PostgreSQL on [Supabase](https://supabase.com/)
- **Schema**: Raw SQL migrations ([data/schema.sql](data/schema.sql)) with Row Level Security & Triggers
- **Authentication**: Supabase Auth (JWT verification & RLS)

---

## 📁 Repository Structure

```
ShortKing/
├── frontend/             # Next.js 16 App Router application
│   ├── public/           # Static assets
│   └── src/
│       ├── app/          # App router pages (Home, Login, Register, Dashboard, [shortCode])
│       ├── components/   # UI components (ui, url, dashboard, navbar)
│       ├── hooks/        # Custom React hooks (useAuth, useUrls)
│       ├── lib/          # API client, Supabase config, utilities
│       └── types/        # Frontend type declarations
├── backend/              # Fastify REST API backend
│   ├── src/
│   │   ├── cache/        # Redis cache manager & fallback
│   │   ├── config/       # Environment & database configurations
│   │   ├── routes/       # API endpoints & redirect routes
│   │   ├── controllers/  # Request validation & response orchestration
│   │   ├── services/     # URL generation, collision & business logic
│   │   ├── repositories/ # Database persistence layer
│   │   ├── middleware/   # JWT auth, rate limiting & error handling
│   │   └── utils/        # Base62 generator, URL sanitization, IP hashing
│   └── tests/            # Vitest unit & integration test suites
├── shared/               # Common TypeScript definitions & DTO contracts
├── data/                 # Database schema, seed data, and setup instructions
│   ├── schema.sql        # Supabase PostgreSQL schema, triggers & RLS policies
│   ├── seed.sql          # Test data (optional)
│   └── README.md         # Database setup guide
├── docs/                 # System architecture, API specs, schemas & guides
├── .env.example          # Monorepo environment variable template
├── package.json          # Root workspace configuration
└── tsconfig.base.json    # Shared TypeScript compiler options
```

---

## 📋 Acceptance Criteria

| Component           | Acceptance Criteria                                                                                                                 |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| **URL Shortener**   | Validates HTTP/HTTPS schemes; rejects `javascript:`, `data:`, `file:`; generates collision-free 7-character Base62 codes.           |
| **Custom Aliases**  | Enforces 3–64 chars; alphanumeric + dashes; blocks reserved aliases (`admin`, `api`, `auth`, `dashboard`, `login`, `logout`, etc.). |
| **Redirection**     | Resolves code or alias; checks `is_active`; validates `expires_at`; records user-agent/country/referrer; returns HTTP 307.          |
| **Semantic Errors** | Returns 404 for unknown codes; returns 410 Gone for expired or deactivated links; returns 400 for malformed input.                  |
| **Authentication**  | Derives user from verified Supabase JWT; blocks unauthorized access to private links and analytics.                                 |
| **Analytics**       | Aggregates clicks over time, devices, browsers, operating systems, and referrers without leaking raw client IP addresses.           |
| **QR Codes**        | Client/server renders downloadable PNG QR code for any shortened link.                                                              |
| **Rate Limiting**   | Configurable IP / User rate limits via `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX_REQUESTS` with standard 429 response.             |
| **Resilience**      | Transparent Redis caching with automatic database fallback; works offline with high-fidelity local memory store.                    |

---

## 🚀 Monorepo Commands

| Command                       | Description                                                                                       |
| :---------------------------- | :------------------------------------------------------------------------------------------------ |
| `npm run dev`                 | **All-in-one dev environment**: Runs Frontend (3000), Backend (5000/5001), and ngrok HTTPS tunnel |
| `npm run dev:frontend`        | Start Next.js development server at [http://localhost:3000](http://localhost:3000)                |
| `npm run dev:backend`         | Start Fastify API with live reload at [http://localhost:5000](http://localhost:5000) (or 5001)    |
| `npm run dev:tunnel`          | Expose backend API with ngrok HTTPS tunnel                                                        |
| `npm run dev:tunnel:frontend` | Expose Next.js frontend (port 3000) with ngrok HTTPS tunnel                                       |
| `npm run build`               | Build all monorepo packages (`shared`, `backend`, `frontend`)                                     |
| `npm run test`                | Run all unit and integration test suites using Vitest                                             |
| `npm run lint`                | Run ESLint across all workspaces                                                                  |
| `npm run format`              | Format code across all workspaces using Prettier                                                  |
| `npm run format:check`        | Verify code formatting against Prettier rules                                                     |

---

## ⚡ Single-Command Local Development (`npm run dev`)

ShortKing features a unified developer environment. Running a single command boots the entire stack and exposes a public HTTPS tunnel:

```bash
npm run dev
```

### Architecture

```text
                    Internet / Mobile Device / Webhook
                                   │
                                ngrok HTTPS
                        (https://xxxx.ngrok-free.app)
                                   │
                                   ▼
                            Fastify API
                        (http://localhost:5000 or 5001)
                                   ▲
                                   │
            ┌──────────────────────┴──────────────────────┐
            ▼                                             ▼
   Next.js Frontend                                   Supabase
 (http://localhost:3000)                       (PostgreSQL & Auth)
```

### 1. Prerequisites

1. **Node.js**: v20+ LTS (Tested on Node.js v26.10)
2. **npm**: v10+
3. **ngrok CLI**:
   - macOS (Homebrew):
     ```bash
     brew install ngrok
     ```
   - Linux / Windows: Download from [ngrok.com/download](https://ngrok.com/download)

### 2. Configure ngrok Authtoken

ngrok v3+ requires a free authtoken:

1. Sign up for a free account at [ngrok.com/signup](https://dashboard.ngrok.com/signup).
2. Retrieve your token from [dashboard.ngrok.com/get-started/your-authtoken](https://dashboard.ngrok.com/get-started/your-authtoken).
3. Connect your token via either method:
   - **Method A (Recommended CLI config)**:
     ```bash
     ngrok config add-authtoken <your-authtoken>
     ```
   - **Method B (Environment variable)**:
     Add to `.env` or `backend/.env`:
     ```env
     NGROK_AUTHTOKEN=your_authtoken_here
     ```

### 3. Startup Banner Output

When you run `npm run dev`, all three processes launch concurrently with colorized output labels (`[Frontend]`, `[Backend]`, `[Tunnel]`), followed by a startup summary:

```text
─────────────────────────────────────────────────────────────────
 👑 ShortKing Development Environment
─────────────────────────────────────────────────────────────────

  Frontend:          http://localhost:3000
  Backend (Local):   http://localhost:5000 (or 5001)
  API Health Check:  http://localhost:5000/api/v1/health

  Public API URL:    https://a1b2-c3d4.ngrok-free.app
  Public Health:     https://a1b2-c3d4.ngrok-free.app/api/v1/health
  Redirect Demo:     https://a1b2-c3d4.ngrok-free.app/<shortCode>

─────────────────────────────────────────────────────────────────
```

### 4. Verification

Test the local and public endpoints:

```bash
# Check local health
curl -i http://localhost:5000/api/v1/health

# Check public ngrok health
curl -i https://<your-subdomain>.ngrok-free.app/api/v1/health

# Shorten a URL via the public API
curl -X POST https://<your-subdomain>.ngrok-free.app/api/v1/urls \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://github.com", "customAlias": "gh"}'

# Test redirection through ngrok
curl -i https://<your-subdomain>.ngrok-free.app/gh
# -> HTTP/1.1 307 Temporary Redirect
# -> Location: https://github.com
```

### 5. Troubleshooting & FAQ

#### Port 5000 macOS AirPlay Conflict

On macOS (Monterey, Ventura, Sonoma, Sequoia), macOS **AirPlay Receiver** (`ControlCenter`) listens on port 5000 (`Server: AirTunes`).

- **Automatic Fallback**: ShortKing detects this automatically. The Fastify backend and ngrok tunnel automatically route to **port 5001** with zero manual intervention required.
- **Using Port 5000 strictly**: If you prefer port 5000, disable AirPlay Receiver:
  `System Settings` → `General` → `AirDrop & Handoff` → Toggle **AirPlay Receiver** to `Off`.

#### ngrok Authtoken Missing (`ERR_NGROK_4018`)

If ngrok cannot find a valid token, ShortKing will display an informative banner with signup links and continue serving local development on `localhost:3000` and `localhost:5000` without crashing.

#### Tunneling Frontend Instead of Backend

If you want to test the Next.js UI from a mobile device or external browser over ngrok:

```bash
npm run dev:tunnel:frontend
```

This runs ngrok targeting port `3000`.

#### Clean Termination

Pressing `Ctrl+C` cleanly shuts down Fastify, Next.js, and terminates the ngrok child process so no orphaned background processes remain.

---

## 🔧 Getting Started & Setup

### 1. Prerequisites

- **Node.js**: v20+ LTS (Tested on Node.js v26)
- **npm**: v10+

### 2. Installation

```bash
git clone https://github.com/Mithun-069/ShortKing.git
cd ShortKing
npm install
```

### 3. Environment Setup

Copy the example environment template:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

### 4. Supabase Setup

1. Log in to [Supabase](https://supabase.com/) and create a new project.
2. In the Supabase dashboard, navigate to the **SQL Editor**.
3. Copy the entire contents of [data/schema.sql](data/schema.sql) and execute the query.
4. Verify the created tables in the **Table Editor**:
   - `profiles`
   - `urls`
   - `click_events`
   - `reserved_aliases`
5. Copy your API credentials from **Project Settings → API**:
   - `Project URL` → `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `SUPABASE_ANON_KEY` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY` _(Never expose this to frontend)_

_Note: The platform features high-fidelity local in-memory fallback, allowing complete local development and testing even prior to connecting live Supabase credentials._

---

## 🧪 Testing & Verification

Run the full test suite:

```bash
npm run test
```

Start the application:

```bash
# Terminal 1: Backend API
npm run dev:backend

# Terminal 2: Frontend
npm run dev:frontend
```

1. **Landing Page**: Visit [http://localhost:3000](http://localhost:3000) and shorten a link.
2. **Dashboard**: Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to search, filter, and view links.
3. **Analytics**: Click on any link's "Stats" button to view clicks over time and device breakdowns.
4. **QR Codes**: Click "QR" on any link to preview and download the generated PNG.
5. **Redirection**: Click any shortened URL to test direct redirection to the destination.

---

## 📖 Documentation

- [Architecture Overview](docs/architecture.md)
- [API Reference](docs/api.md)
- [Database Schema & RLS](docs/database.md)
- [Security Guidelines](docs/security.md)
- [Deployment Playbook](docs/deployment.md)

---

## 📄 License

MIT © [ShortKing](https://github.com/Mithun-069/ShortKing)
