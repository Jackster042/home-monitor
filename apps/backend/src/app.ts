import express from "express";
import { apiRouter } from "./api";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json());

  app.get("/", (_request, response) => {
    response.json({
      name: "home-monitor-backend",
      status: "ok"
    });
  });

  app.use("/", apiRouter);

  app.use((_request, response) => {
    response.status(404).json({
      error: "Not Found"
    });
  });

  return app;
}
