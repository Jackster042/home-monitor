import { Router } from "express";
import { authRouter } from "./routes/auth.routes";
import { camerasRouter } from "./routes/cameras.routes";
import { clipsRouter } from "./routes/clips.routes";
import { eventsRouter } from "./routes/events.routes";
import { healthRouter } from "./routes/health.routes";
import { notificationsRouter } from "./routes/notifications.routes";
import { snapshotsRouter } from "./routes/snapshots.routes";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/cameras", camerasRouter);
apiRouter.use("/events", eventsRouter);
apiRouter.use("/clips", clipsRouter);
apiRouter.use("/snapshots", snapshotsRouter);
apiRouter.use("/notifications", notificationsRouter);
