import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  registerUserSchema,
  loginUserSchema,
} from "../validators/auth.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
const authController = new AuthController();

router.post("/register", validate(registerUserSchema), authController.register);

router.post("/login", validate(loginUserSchema), authController.login);
router.get("/me", authenticate, authController.me);
export default router;
