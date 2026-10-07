import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z
    .string()
    .default("5000")
    .transform((val) => parseInt(val, 10)),
  FRONTEND_URL: z.string().default("http://localhost:3000"),
  SHORT_URL_DOMAIN: z.string().default("http://localhost:3000"),
  NGROK_PUBLIC_URL: z.string().optional().or(z.literal("")),

  SUPABASE_URL: z.string().url().optional().or(z.literal("")),
  SUPABASE_ANON_KEY: z.string().optional().or(z.literal("")),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().or(z.literal("")),

  DATABASE_URL: z.string().optional().or(z.literal("")),
  REDIS_URL: z.string().optional().or(z.literal("")),

  SHORT_CODE_LENGTH: z
    .string()
    .default("7")
    .transform((val) => parseInt(val, 10)),
  MAX_URL_LENGTH: z
    .string()
    .default("8192")
    .transform((val) => parseInt(val, 10)),
  MAX_ALIAS_LENGTH: z
    .string()
    .default("64")
    .transform((val) => parseInt(val, 10)),

  RATE_LIMIT_WINDOW_MS: z
    .string()
    .default("60000")
    .transform((val) => parseInt(val, 10)),
  RATE_LIMIT_MAX_REQUESTS: z
    .string()
    .default("10")
    .transform((val) => parseInt(val, 10)),

  IP_HASH_SALT: z.string().default("shortking-default-salt"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;

export const isSupabaseConfigured = Boolean(
  env.SUPABASE_URL && (env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY),
);
