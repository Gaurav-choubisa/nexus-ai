import { Request, Response } from "express";

import { asyncHandler } from "@nexus/shared";

import { AuthService } from "../services/auth.service";
import { RegisterUserSchema } from "../validators/auth.validator";

export class AuthController {
  private readonly authService = new AuthService();

  register = asyncHandler(async (req: Request, res: Response) => {
    const data = RegisterUserSchema.parse(req.body);

    const user = await this.authService.register(data);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  });
}
