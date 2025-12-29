import { Router } from "express";
import { ForgotPasswordController } from "../../modules/auth/useCases/forgotPassword/ForgotPasswordController";
import { ResetPasswordController } from "../../modules/auth/useCases/resetPassword/ResetPasswordController";

const authRoutes = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

authRoutes.post("/forgot-password", (req, res) =>
  forgotPasswordController.handle(req, res)
);
authRoutes.post("/reset-password", (req, res) =>
  resetPasswordController.handle(req, res)
);

export { authRoutes };
