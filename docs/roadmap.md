# Roadmap

## Roadmap Intent

This roadmap is meant to guide implementation while keeping the project aligned with the documented architecture. It is not a strict calendar. It is a sequence of logical milestones.

## Phase 0 - Documentation And Foundation

Primary outcome:

- the project has a clear structure, documented architecture, and a usable monorepo foundation

Key deliverables:

- repo scaffold
- documentation set
- workspace scripts
- starter backend and frontend

## Phase 1 - Backend Core

Primary outcome:

- the backend can persist and expose application data without depending on physical hardware

Key deliverables:

- Prisma schema
- migrations
- normalized API shape
- mock event ingestion
- storage and notification interfaces

## Phase 2 - Frontend Core

Primary outcome:

- the UI can present realistic monitoring workflows against backend data

Key deliverables:

- route structure
- dashboard
- event list and detail
- health page
- settings page shell

## Phase 3 - Live Integration Foundations

Primary outcome:

- service boundaries are ready for real Frigate, MQTT, and database integration

Key deliverables:

- live MQTT subscription
- initial Frigate event mapping
- background job execution
- first cloud upload path
- first email notification path

## Phase 4 - Hardware-Backed Bring-Up

Primary outcome:

- the software is exercised against real cameras and the eventual hub environment

Key deliverables:

- Raspberry Pi deployment
- SSD-backed media paths
- 1-2 camera validation
- Frigate tuning
- local retention validation

## Phase 5 - Expansion And Hardening

Primary outcome:

- the platform is stable enough to scale and expose remotely

Key deliverables:

- scale beyond initial cameras
- stronger auth handling
- Cloudflare Tunnel setup
- more complete health monitoring
- fallback object storage behavior

## Decision Areas Still Open

- final backend framework choice if not fixed immediately
- exact auth implementation style
- final job execution strategy for retries and scheduled work
- Frigate inference hardware decision once load is known
- notification expansion beyond SES email

## Risks To Watch

- overbuilding before live inputs exist
- tying the backend too closely to raw Frigate payloads
- letting cloud provider details leak across the codebase
- assuming Raspberry Pi throughput before testing
- treating notification delivery as part of the critical event write path

## Recommended Next Implementation Step

The next best step is to turn the backend from a simple starter into a real application skeleton with:

1. config loading
2. Prisma setup
3. health route
4. mock event ingestion path
5. initial event query route
