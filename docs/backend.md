# Backend Design

## Backend Role

The backend is the application control plane. It turns Frigate's event stream into a product-oriented API, operational record, and policy engine.

The backend should not attempt to replace Frigate. It should instead normalize Frigate output, store durable metadata, coordinate background work, and expose a clean surface to the frontend.

## Main Responsibilities

- REST API for the frontend
- MQTT subscription and event ingestion
- database persistence
- authentication and authorization
- health checks and status recording
- cloud storage coordination
- email notification dispatch
- scheduled digest and cleanup jobs

## Suggested Technology Direction

- runtime: `Node.js`
- language: `TypeScript`
- API framework: `Fastify` or `Express`
- database access: `Prisma`
- scheduler: process-local cron at first, upgrade later if needed
- MQTT client: lightweight persistent subscriber
- validation: schema-based request and env validation

`Fastify` is a good default because it is lightweight, fast, and fits well with typed schema-driven APIs, but the architecture does not depend on that choice.

## Suggested Module Layout

```text
apps/backend/src/
  api/
  auth/
  config/
  db/
  health/
  jobs/
  mqtt/
  notifications/
  storage/
  services/
  index.ts
```

## Module Responsibilities

## `api/`

Defines route handlers, request validation, and response shaping for the frontend.

Suggested early areas:

- health endpoints
- auth endpoints
- camera listing
- events listing and filtering
- clip listing
- snapshot listing
- notification history

## `auth/`

Handles login, token/session logic, and route protection. The initial model should remain single-admin because it keeps the first version simple without blocking future expansion.

## `config/`

Centralizes environment variable parsing and startup validation. This becomes more important as cloud storage and email integrations are added.

## `db/`

Owns Prisma client initialization, migrations, and application query helpers.

## `health/`

Collects status from internal services or background checks and stores health snapshots for dashboard visibility.

## `jobs/`

Runs periodic or deferred work such as:

- daily digest generation
- weekly digest generation
- upload retries
- local retention enforcement
- health polling

## `mqtt/`

Manages broker connection, subscriptions, and event payload translation. This layer should remain thin. It should convert broker messages into internal application events without embedding business logic directly into message handlers.

## `notifications/`

Contains outbound messaging adapters. The first implementation should only include SES email support, but the interface should not assume email is the only channel forever.

## `storage/`

Encapsulates object storage concerns and exposes a provider-independent interface.

Suggested abstraction:

- upload media object
- check object existence
- generate object metadata
- record provider and key information
- retry or redirect failed uploads

## `services/`

Contains reusable application services that coordinate multiple modules. This is where event-processing workflows and upload orchestration typically belong.

## Request Model

The backend should expose product-oriented endpoints rather than mirroring Frigate's raw payload shapes.

Examples of useful early API areas:

- `GET /health`
- `GET /cameras`
- `GET /events`
- `GET /events/:id`
- `GET /clips`
- `GET /snapshots`
- `GET /notifications`
- `POST /auth/login`

The API should return normalized fields that stay stable even if Frigate message formats or cloud provider details evolve.

## Event Ingestion Model

The backend should subscribe to Frigate MQTT topics and convert those messages into internal domain records.

Important behavior:

- deduplicate events using Frigate event identifiers
- accept that events may arrive as updates rather than single final messages
- store partial records when necessary and enrich them later
- separate event persistence from slower work such as uploads and notifications

This separation is important because a slow cloud provider or email provider should not block core event recording.

## Data Model Direction

The backend likely needs the following core tables.

- `users`
- `cameras`
- `events`
- `snapshots`
- `clips`
- `notifications`
- `system_health`

Useful supporting concepts:

- provider name for object storage uploads
- upload status and retry count
- per-camera health state
- notification type and send status

## Authentication Direction

The initial design should use a single-admin login model.

That keeps the first iteration practical because:

- the system is for a private household environment
- multi-user authorization is not required to validate the architecture
- remote access can still be secured without inventing unnecessary roles early

Whether JWT or server-managed session storage is used can be decided later. The important design point is that protected routes should be cleanly separated from public health or bootstrap endpoints.

## Health And Observability

The backend should make failures visible rather than silent.

Recommended tracked states:

- last successful MQTT connection
- last event received time
- per-camera online or offline assessment
- storage upload failures
- last digest job outcome
- disk usage warnings

These states should be visible in both the database and the UI.

## Why A Storage Abstraction Matters

The project now targets `Cloudflare R2` first and `Backblaze B2` second. A storage abstraction prevents object storage code from leaking into route handlers, MQTT handlers, or UI-facing logic.

That gives the project:

- easier provider switching
- clearer retry logic
- cleaner tests
- less invasive future changes

## Near-Term Backend Deliverables Without Hardware

1. environment config and startup validation
2. health endpoint and application boot path
3. Prisma schema and migrations
4. mock event ingestion endpoint or simulated MQTT input
5. normalized event persistence logic
6. storage provider interface with local mock implementation
7. SES adapter interface with stub implementation
