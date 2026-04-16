import { createApp } from "./app";
import { bootstrapApplication, shutdownApplication } from "./config/bootstrap";
import { env } from "./config/env";

async function main() {
  await bootstrapApplication();

  const app = createApp();
  const server = app.listen(env.APP_PORT, () => {
    console.log(`Backend listening on http://localhost:${env.APP_PORT}`);
  });

  const shutdown = async (signal: string) => {
    console.log(`${signal} received, shutting down backend`);

    server.close(async () => {
      await shutdownApplication();
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

void main().catch(async (error: unknown) => {
  console.error("Backend bootstrap failed", error);
  await shutdownApplication();
  process.exit(1);
});
