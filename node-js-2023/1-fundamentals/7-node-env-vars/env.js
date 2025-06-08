const { z } = require("zod");
require("dotenv").config();

const envSchema = z.object({
  PORT: z
    .string()
    .default('3000') // se não vier, assume '3000'
    .transform(Number)
    .refine((n) => !isNaN(n), {
      message: "PORT deve ser um número válido",
    }),
  API_KEY: z.string().min(1, "API_KEY é obrigatória"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"), // se não vier, assume "development"
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("⚠️ Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables.");
}

const env = _env.data;

module.exports = { env };