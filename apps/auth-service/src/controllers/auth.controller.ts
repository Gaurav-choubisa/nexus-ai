import { Request, Response } from "express";

import { RegisterUserSchema } from "../validators/auth.validator";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const data = RegisterUserSchema.parse(req.body);

      const user = await this.authService.register(data);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}
