import { createServer } from "node:http";
import type { HealthSnapshot } from "@home-monitor/types";

const port = Number(process.env.APP_PORT ?? 4000);

const health: HealthSnapshot = {
  service: "backend",
  status: "healthy",
  checkedAt: new Date().toISOString(),
  message: "Default backend scaffold is running"
};

const server = createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(health));
    return;
  }

  response.writeHead(200, { "content-type": "application/json" });
  response.end(
    JSON.stringify({
      name: "home-monitor-backend",
      status: "ok"
    })
  );
});

server.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
