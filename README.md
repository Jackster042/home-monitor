# Home Monitoring System

Monorepo for a self-hosted home monitoring system built around Frigate, PostgreSQL, a Node.js backend, and a React frontend.

## Layout

```text
apps/
  backend/    Node.js + TypeScript API
  frontend/   Vite + React + TypeScript web app
packages/
  types/      Shared domain types
infra/
  docker/     Docker Compose files
  frigate/    Frigate config
  nginx/      Nginx config
docs/         Project docs
```

## Workspace

- Package manager: `pnpm`
- Runtime: `Node.js 20+`
- Database: `PostgreSQL`

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck
```

## Status

- Default repo scaffold created
- Implementation work starts next with backend, frontend, and Docker service wiring
