import { Router } from "express";
import { healthService } from "../../health/health.service";

export const healthRouter = Router();

healthRouter.get("/health", (_request, response) => {
  response.json(healthService.getSnapshot());
});
