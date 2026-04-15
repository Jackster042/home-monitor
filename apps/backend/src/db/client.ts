import { PrismaClient } from "@prisma/client";

declare global {
  var __homeMonitorPrisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.__homeMonitorPrisma ??
  new PrismaClient({
    log: ["warn", "error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__homeMonitorPrisma = prisma;
}
