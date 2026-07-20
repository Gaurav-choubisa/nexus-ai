import { Request, Response, NextFunction } from "express";

import { AppError } from "@nexus/shared";

import { JwtService } from "../utils/jwt";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }

  try {
    const payload = JwtService.verifyAccessToken(token);

    req.user = payload;

    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
};
