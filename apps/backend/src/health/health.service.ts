import type { HealthSnapshot } from "@home-monitor/types";
import { prisma } from "../db/client";

interface RecordHealthInput {
  service: string;
  status: "healthy" | "warning" | "error";
  message?: string;
}

export const healthService = {
  async getSnapshot(): Promise<HealthSnapshot> {
    const latest = await prisma.systemHealth.findFirst({
      where: { service: "backend" },
      orderBy: { checkedAt: "desc" }
    });

    if (!latest) {
      return {
        service: "backend",
        status: "warning",
        checkedAt: new Date().toISOString(),
        message: "No persisted health records yet"
      };
    }

    return {
      service: latest.service,
      status: latest.status as HealthSnapshot["status"],
      checkedAt: latest.checkedAt.toISOString(),
      message: latest.message ?? undefined
    };
  },

  async recordStatus(input: RecordHealthInput) {
    return prisma.systemHealth.create({
      data: {
        service: input.service,
        status: input.status,
        message: input.message
      }
    });
  }
};
