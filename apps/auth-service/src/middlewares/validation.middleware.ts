import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";

import { AppError } from "@nexus/shared";

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        return next(new AppError(JSON.stringify(errors), 400));
      }

      next(error);
    }
  };
};
