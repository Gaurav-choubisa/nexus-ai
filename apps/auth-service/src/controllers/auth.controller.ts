import { Request, Response } from "express";

import { asyncHandler } from "@nexus/shared";

import { AuthService } from "../services/auth.service";

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  });

  me = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.me(req.user!.userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  });
}
