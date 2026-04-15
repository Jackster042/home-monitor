import { Router } from "express";
import { eventService } from "../../services/event.service";

export const eventsRouter = Router();

eventsRouter.get("/", (_request, response) => {
  response.json({
    data: eventService.list(),
    meta: {
      source: "stub"
    }
  });
});

eventsRouter.get("/:eventId", (request, response) => {
  const event = eventService.getById(request.params.eventId);

  if (!event) {
    response.status(404).json({ error: "Event not found" });
    return;
  }

  response.json({ data: event });
});
