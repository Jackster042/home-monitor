# Home Monitoring System Plan

## Goal

Build a self-hosted home monitoring system that runs on a Raspberry Pi 5, ingests RTSP camera streams through Frigate, stores event metadata in PostgreSQL, exposes a custom backend API, provides a web UI for monitoring and review, backs up media to AWS S3, and sends notifications for important events and system issues.

## Working Principles

- Start small and verify end-to-end before scaling to all cameras.
- Treat Frigate as the source of truth for motion/object events.
- Keep the first version local-first; add remote access after the core system is stable.
- Ship email notifications first; add WhatsApp and Viber later.
- Prefer the smallest correct implementation over early abstraction.

## Default Repo Direction

Recommended repo layout:

```text
/home-monitor
  /apps
    /backend
    /frontend
  /packages
    /types
  /infra
    /docker
    /frigate
    /nginx
  /docs
  .env.example
  .gitignore
  package.json
  pnpm-workspace.yaml
  tsconfig.base.json
  README.md
```

Default stack choices:

- Package manager: `pnpm`
- Backend: `Node.js + TypeScript`
- Frontend: `Vite + React + TypeScript`
- Routing: `TanStack Router`
- Data fetching: `TanStack Query`
- Database: `PostgreSQL`
- ORM/migrations: `Prisma`
- Infra: `Docker Compose`
- Reverse proxy: `Nginx`
- NVR/event source: `Frigate`
- Messaging: `Mosquitto MQTT`

## Initial Architecture

```text
WiFi Cameras (RTSP)
  -> Frigate
  -> Mosquitto MQTT
  -> Backend API + Jobs
  -> PostgreSQL
  -> Frontend
  -> AWS S3
  -> SES Email Notifications
```

## MVP Scope

The first usable version should do the following:

1. Connect 1-2 RTSP cameras to Frigate.
2. Receive Frigate events over MQTT.
3. Persist cameras, events, snapshots, and clips metadata in PostgreSQL.
4. Show dashboard and event history in the frontend.
5. Upload snapshots and clips to S3.
6. Send email alerts and digest reports.
7. Expose the app locally behind Nginx.

Out of MVP:

- WhatsApp notifications
- Viber notifications
- Multi-user auth/roles
- Full 8-10 camera rollout before performance validation

## Build Phases

## Phase 0 - Repo Foundation

Deliverables:

- Monorepo folder structure created
- Workspace configuration added
- Shared TypeScript config added
- Root `.gitignore` and `.env.example` added
- Base `README.md` added
- Infra directories added

Success criteria:

- Repo installs cleanly
- Workspace scripts run from the root
- Folder structure supports backend, frontend, and infra work without reorganization

## Phase 1 - Local Hub Bring-Up

Deliverables:

- Raspberry Pi 5 prepared with Ubuntu Server
- External SSD mounted for Frigate media
- Docker and Compose installed
- Frigate, Mosquitto, PostgreSQL, backend, frontend, and Nginx defined in Compose
- Frigate configured with 1-2 test cameras

Success criteria:

- Cameras stream correctly in Frigate
- Media is written to external storage
- Core services restart cleanly after reboot

## Phase 2 - Backend Core

Deliverables:

- Backend service scaffolded
- Prisma schema and migrations created
- Health endpoint added
- MQTT consumer added for Frigate events
- Initial REST API for cameras/events/clips/snapshots

Success criteria:

- Frigate event arrives over MQTT
- Event is saved to the database
- API returns stored data reliably

## Phase 3 - Frontend Core

Deliverables:

- Frontend scaffolded with Vite + React + TypeScript
- Router and query client configured
- Login page scaffolded
- Dashboard page created
- Events page created
- Clips page created
- Settings page placeholder created

Success criteria:

- Frontend loads against live backend data
- User can browse events and clips
- Dashboard shows basic service and camera state

## Phase 4 - Cloud Backup

Deliverables:

- S3 bucket configured
- Upload service created for snapshots and clips
- Retry-safe backup job added
- S3 metadata stored in database
- Local retention policy defined

Success criteria:

- New media uploads to S3 after event processing
- Failed uploads are visible and retryable
- Local storage usage remains bounded

## Phase 5 - Notifications

Deliverables:

- SES integration added
- Event alert emails added
- Daily/weekly digest job added
- Notification logging stored in database
- Technical alerts for offline camera, disk usage, and service failure added

Success criteria:

- Alert email sends successfully
- Digest report reflects recent events
- Notification attempts are auditable in the DB

## Phase 6 - Security and Remote Access

Deliverables:

- Single-admin authentication added
- Protected API routes enforced
- Nginx reverse proxy finalized
- DuckDNS configured
- Cloudflare Tunnel configured

Success criteria:

- App is accessible securely from outside the home network
- Protected routes reject unauthenticated access
- No direct RTSP exposure to the public internet

## Suggested Backend Modules

```text
apps/backend/src/
  api/
  auth/
  db/
  health/
  jobs/
  mqtt/
  notifications/
  storage/
  index.ts
```

## Suggested Frontend Modules

```text
apps/frontend/src/
  components/
  hooks/
  routes/
  lib/
  main.tsx
```

## Data Model Direction

Core tables:

- `users`
- `cameras`
- `events`
- `snapshots`
- `clips`
- `notifications`
- `system_health`

Notes:

- Use a Frigate event identifier to link backend records to Frigate events.
- Store local paths and S3 metadata separately.
- Avoid storing sensitive camera connection data in plain text unless required.

## Key Technical Decisions

- Auth starts as single-admin only.
- Notifications start with SES email only.
- Frigate inference hardware remains open until tested.
- Remote access comes after local stability.
- S3 uploads should happen in background jobs, not inline in MQTT handling.

## Risks

- 8-10 cameras may exceed Pi-only processing comfort depending on stream quality and detection settings.
- RTSP quality settings can make or break storage and CPU usage.
- Notification integrations beyond email add operational complexity.
- Remote access is a security-sensitive step and should not be rushed.

## MVP Acceptance Criteria

- At least 1 camera works end-to-end through Frigate
- Motion event is received by backend
- Event metadata is persisted in PostgreSQL
- Snapshot appears in frontend event view
- Clip metadata appears in frontend clip view
- Snapshot or clip uploads to S3 successfully
- Email alert or digest sends successfully
- Dashboard shows camera and service health

## Immediate Next Steps

1. Create the default monorepo structure.
2. Add root workspace files (`package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`).
3. Scaffold `apps/backend` and `apps/frontend`.
4. Add base infra folders and starter config files.
5. Add `.env.example` and `README.md`.

## Current Status

- Planning document created
- Repo scaffold not yet created
- No services implemented yet
