import { Router } from "express";
import { cameraService } from "../../services/camera.service";

export const camerasRouter = Router();

camerasRouter.get("/", (_request, response) => {
  response.json({
    data: cameraService.list(),
    meta: {
      source: "stub"
    }
  });
});
