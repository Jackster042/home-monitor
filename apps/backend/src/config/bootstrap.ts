import { prisma } from "../db/client";
import { healthService } from "../health/health.service";
import { jobsService } from "../jobs/jobs.service";
import { mqttService } from "../mqtt/mqtt.service";

export async function bootstrapApplication() {
  await prisma.$connect();
  await healthService.recordStatus({
    service: "backend",
    status: "healthy",
    message: "Backend bootstrap completed"
  });

  jobsService.register();
  mqttService.register();
}

export async function shutdownApplication() {
  await prisma.$disconnect();
}
