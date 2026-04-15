import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const authService = {
  login(input: unknown) {
    const parsed = loginSchema.safeParse(input);

    if (!parsed.success) {
      return {
        statusCode: 400,
        body: {
          error: "Invalid login payload",
          details: parsed.error.flatten()
        }
      };
    }

    return {
      statusCode: 501,
      body: {
        message: "Authentication scaffolded. Session handling is not implemented yet.",
        email: parsed.data.email
      }
    };
  }
};
