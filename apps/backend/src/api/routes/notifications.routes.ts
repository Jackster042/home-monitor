import { Router } from "express";
import { notificationService } from "../../services/notification.service";

export const notificationsRouter = Router();

notificationsRouter.get("/", (_request, response) => {
  response.json({
    data: notificationService.list(),
    meta: {
      source: "stub"
    }
  });
});
