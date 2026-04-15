import { Router } from "express";
import { snapshotService } from "../../services/snapshot.service";

export const snapshotsRouter = Router();

snapshotsRouter.get("/", (_request, response) => {
  response.json({
    data: snapshotService.list(),
    meta: {
      source: "stub"
    }
  });
});
