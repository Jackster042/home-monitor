import { Router } from "express";
import { clipService } from "../../services/clip.service";

export const clipsRouter = Router();

clipsRouter.get("/", (_request, response) => {
  response.json({
    data: clipService.list(),
    meta: {
      source: "stub"
    }
  });
});
