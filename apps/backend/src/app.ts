import express from "express";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
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

  app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof ZodError) {
      response.status(400).json({
        error: "Invalid request payload",
        details: error.flatten()
      });
      return;
    }

    console.error("Unhandled application error", error);
    response.status(500).json({
      error: "Internal Server Error"
    });
  });

  app.use((_request, response) => {
    response.status(404).json({
      error: "Not Found"
    });
  });

  return app;
}
