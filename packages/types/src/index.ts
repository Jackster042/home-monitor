export type ServiceStatus = "healthy" | "warning" | "error";

export interface HealthSnapshot {
  service: string;
  status: ServiceStatus;
  checkedAt: string;
  message?: string;
}
