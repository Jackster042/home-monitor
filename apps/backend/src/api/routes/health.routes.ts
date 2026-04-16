import { Router } from "express";
import { healthService } from "../../health/health.service";

export const healthRouter = Router();

healthRouter.get("/health", async (_request, response) => {
  const snapshot = await healthService.getSnapshot();
  response.json(snapshot);
});
