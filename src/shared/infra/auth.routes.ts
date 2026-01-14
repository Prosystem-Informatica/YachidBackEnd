import { Router } from "express";
import { ForgotPasswordController } from "../../modules/auth/useCases/forgotPassword/ForgotPasswordController";
import { ResetPasswordController } from "../../modules/auth/useCases/resetPassword/ResetPasswordController";
import { VerifyResetCodeController } from "../../modules/auth/useCases/verifyResetCode/VerifyResetCodeController";
import { ImpersonateEnterpriseController } from "../../modules/auth/useCases/impersonateEnterprise/ImpersonateEnterpriseController";

const authRoutes = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const verifyResetCodeController = new VerifyResetCodeController();
const impersonateEnterpriseController = new ImpersonateEnterpriseController();

authRoutes.post("/forgot-password", (req, res) =>
  forgotPasswordController.handle(req, res)
);
authRoutes.post("/reset-password", (req, res) =>
  resetPasswordController.handle(req, res)
);
authRoutes.post("/verify-reset-code", (req, res) =>
  verifyResetCodeController.handle(req, res)
);

authRoutes.post("/impersonate", (req, res) =>
  impersonateEnterpriseController.handle(req, res)
);

export { authRoutes };
