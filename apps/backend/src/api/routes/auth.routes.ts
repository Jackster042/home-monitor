import { Router } from "express";
import { authService } from "../../auth/auth.service";

export const authRouter = Router();

authRouter.post("/login", (request, response) => {
  const result = authService.login(request.body);
  response.status(result.statusCode).json(result.body);
});
