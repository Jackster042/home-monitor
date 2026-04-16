import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_PORT: z.coerce.number().int().positive().default(4000),
  APP_HOST: z.string().min(1).default("localhost"),
  DATABASE_URL: z.string().min(1).default("postgresql://postgres:postgres@localhost:5432/home_monitor"),
  JWT_SECRET: z.string().min(1).default("change-me"),
  FRIGATE_MQTT_HOST: z.string().min(1).default("mosquitto"),
  FRIGATE_API_URL: z.string().url().default("http://frigate:5000"),
  ENABLE_MOCK_INGESTION: z
    .string()
    .optional()
    .transform((value) => value !== "false")
});

export const env = envSchema.parse(process.env);
