# ShortKing Deployment Playbook

## Production Environments

- **Frontend**: Vercel / Cloudflare Pages / Railway
  - Framework: Next.js (Node.js runtime or standalone Docker container)
  - Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_API_URL`
- **Backend API**: Render / Railway / Fly.io / AWS ECS
  - Runtime: Node.js 20+ LTS
  - Command: `npm run start --workspace=@shortking/backend`
- **Database**: Supabase PostgreSQL
- **Cache**: Upstash Redis (Phase 11)

## Monorepo Build Commands

- Build all workspaces:
  ```bash
  npm run build
  ```
- Build frontend only:
  ```bash
  npm run build:frontend
  ```
- Build backend only:
  ```bash
  npm run build:backend
  ```
