# Frontend Design

## Frontend Role

The frontend is the operational user interface for the monitoring system. Its job is not just to show camera media. Its larger role is to provide a concise control surface for events, system health, storage state, and notification outcomes.

The application should be optimized for quick understanding of what happened, what is currently wrong, and what requires action.

## Technology Direction

- `React + TypeScript`
- `Vite`
- `TanStack Router`
- `TanStack Query`

This stack fits well because the application is stateful, data-driven, and likely to grow through route-based views rather than a single dashboard screen.

## Primary UX Objectives

- surface recent events quickly
- show whether cameras and services are healthy
- make clip and snapshot review fast
- keep navigation simple for household usage
- expose storage and notification status clearly

## Suggested Route Structure

```text
/
/login
/dashboard
/cameras
/events
/events/:eventId
/clips
/settings
/health
```

## Route Intent

## `/dashboard`

The dashboard should provide a fast overview of the system.

Suggested content:

- camera online and offline counts
- recent event totals
- latest alerts
- storage usage and backup status
- last successful health check

## `/cameras`

This page should act as inventory and status view rather than a dense wall of video. The first version may show camera cards with metadata, health state, and links into related events.

## `/events`

This is one of the core product pages. It should support searching, filtering, and reviewing motion-driven events with snapshot previews and essential metadata.

## `/events/:eventId`

This detail page should show the full event context.

Useful elements:

- camera identity
- event timestamps
- snapshot preview
- clip availability
- backup status
- notification status
- acknowledge or review state later if needed

## `/clips`

This page should focus on playable recorded media and clip-level filtering.

## `/settings`

This should eventually hold notification preferences, retention settings, account access, and integration status. Early on it can be mostly informational while the system capabilities are still being built.

## `/health`

This route can present a more operations-focused view than the dashboard, showing service connectivity, last successful jobs, warnings, and upload failures.

## Data Fetching Model

`TanStack Query` should manage server data because most of the frontend value comes from reading and refreshing API-backed state.

This should help with:

- cache management
- background refetching
- loading and error state consistency
- route-level data composition

## UI Design Approach

The interface should feel operational and readable rather than decorative.

Recommended emphasis:

- dense but legible information blocks
- strong status color semantics
- clear timestamps and relative time display
- event-first layout rather than marketing-style layout
- mobile support for quick remote checks

## Relationship With Frigate UI

The custom frontend does not need to duplicate every Frigate feature.

It should focus on:

- custom dashboarding
- event review workflow
- cloud backup visibility
- notification history
- application-specific health views

Direct Frigate playback or embedded views can still be used where that saves effort.

## State Categories

The frontend likely needs to handle three main categories of state.

- server state from the backend API
- view and filter state within pages
- auth session state

Keeping those categories separate will reduce complexity as the application grows.

## Near-Term Frontend Deliverables Without Hardware

1. route shell and navigation
2. dashboard using mocked API data
3. event list and event detail layouts
4. health page wired to backend health data
5. settings information page documenting planned capabilities
6. shared UI conventions for status, timestamps, and media cards
