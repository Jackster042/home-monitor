# Software-First Development Without Hardware

## Why This Matters

The project does not need to pause until Raspberry Pi hardware, cameras, or storage devices are purchased. A large portion of the value can be built and validated now if the software is designed around clear interfaces and simulated inputs.

This document describes how to think about the project in that mode.

## What Can Be Built Now

- repository structure and code organization
- backend module boundaries
- database schema and migrations
- API contracts
- frontend routes and UI shells
- object storage abstraction
- notification abstraction
- health model
- event ingestion model using mock inputs

## What Cannot Be Fully Validated Yet

- real RTSP stream stability
- Frigate performance on Raspberry Pi hardware
- SSD throughput under real video load
- camera-specific network behavior
- true operational load across 8-10 devices

Those limits are acceptable as long as they are treated honestly in the documentation.

## Development Strategy Before Hardware Exists

The best approach is to build around simulation-friendly boundaries.

Key idea:

- anything that depends on a camera, Frigate, or a cloud provider should sit behind an interface or adapter

That allows the rest of the application to be built against stable internal contracts.

## Simulation Targets

## Mock Frigate Event Input

The backend should be able to ingest example event payloads without needing a live Frigate instance. This could be done through:

- fixture files
- a development-only HTTP endpoint
- a local script that publishes fake MQTT messages

## Mock Object Storage

Cloud upload code should support a development mode that records upload intent locally or to an in-memory or file-backed stub.

## Mock Notification Sending

Email adapters should have a development implementation that logs outbound messages rather than sending them.

## Mock Health Signals

Dashboard and health views should be able to render against seeded data so the UI can be designed before live service monitoring exists.

## Recommended Early Software Milestones

1. define database schema for cameras, events, clips, snapshots, notifications, and health
2. implement a mock event ingestion path
3. implement normalized event persistence
4. expose API endpoints that return realistic data
5. build frontend pages around that data
6. add cloud storage and email adapter interfaces
7. only then begin wiring live infrastructure pieces

## Benefits Of This Approach

- progress is not blocked by purchasing decisions
- architecture mistakes are cheaper to fix early
- data contracts can mature before live integrations exist
- the UI can be shaped around real workflows instead of assumptions
- future hardware bring-up becomes an integration task rather than the start of the project

## Risks Of This Approach

- simulated behavior can hide performance problems
- some Frigate-specific details may need adjustment later
- storage and notification timing may differ in production

These risks are manageable because the goal of software-first work is not to prove hardware throughput. The goal is to reduce unknowns in the application design.

## Exit Criteria For Leaving Software-First Mode

The project is ready for hardware-backed integration once:

- core backend modules exist
- database schema is stable enough for first use
- frontend routes can render realistic state
- event ingestion works against mock inputs
- storage and notification adapters have clear contracts
- Docker service topology is coherent

At that point, adding real hardware becomes a focused validation phase rather than a broad design phase.
