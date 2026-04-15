import type { HealthSnapshot } from "@home-monitor/types";

export const healthService = {
  getSnapshot(): HealthSnapshot {
    return {
      service: "backend",
      status: "healthy",
      checkedAt: new Date().toISOString(),
      message: "Express backend scaffold is running"
    };
  }
};
