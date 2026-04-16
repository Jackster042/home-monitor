import { Router } from "express";
import { env } from "../../config/env";
import { eventService } from "../../services/event.service";

export const eventsRouter = Router();

eventsRouter.get("/", async (_request, response) => {
  response.json({
    data: await eventService.list(),
    meta: {
      source: "database"
    }
  });
});

eventsRouter.post("/mock", async (request, response) => {
  if (!env.ENABLE_MOCK_INGESTION) {
    response.status(403).json({
      error: "Mock ingestion is disabled"
    });
    return;
  }

  const event = await eventService.ingestMock(request.body);
  response.status(201).json({
    data: event,
    meta: {
      source: "mock-ingestion"
    }
  });
});

eventsRouter.get("/:eventId", async (request, response) => {
  const event = await eventService.getById(request.params.eventId);

  if (!event) {
    response.status(404).json({ error: "Event not found" });
    return;
  }

  response.json({ data: event });
});
