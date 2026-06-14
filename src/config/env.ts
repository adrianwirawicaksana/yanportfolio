import { z } from "zod";

const envSchema = z.object({
  // Backend
  NEXT_PUBLIC_BACKEND_URL: z.string().url("Invalid backend URL"),

  // Midtrans
  NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: z
    .string()
    .min(1, "Midtrans client key is required"),

  // Optional - for future use
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

type Env = z.infer<typeof envSchema>;

// Validate environment variables at build time
const parseEnv = (): Env => {
  const env = {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_MIDTRANS_CLIENT_KEY:
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    NODE_ENV: process.env.NODE_ENV,
  };

  const result = envSchema.safeParse(env);

  if (!result.success) {
    console.error("❌ Environment validation failed:");

    // DI SINI PERUBAHANNYA: .errors diganti jadi .issues
    result.error.issues.forEach((issue) => {
      console.error(`  ${issue.path.join(".")}: ${issue.message}`);
    });

    throw new Error("Invalid environment variables");
  }

  return result.data;
};

export const env = parseEnv();
