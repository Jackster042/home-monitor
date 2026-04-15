import { createApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./db/client";
import { jobsService } from "./jobs/jobs.service";
import { mqttService } from "./mqtt/mqtt.service";

const app = createApp();

async function bootstrap() {
  const server = app.listen(env.APP_PORT, () => {
    console.log(`Backend listening on http://localhost:${env.APP_PORT}`);
  });

  jobsService.register();
  mqttService.register();

  const shutdown = async (signal: string) => {
    console.log(`${signal} received, shutting down backend`);

    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => {
    void shutdown("SIGINT");
  });

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
  });
}

void bootstrap();
