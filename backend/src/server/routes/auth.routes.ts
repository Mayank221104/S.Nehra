import { Router } from "express";
import {
  signup,
  login,
  logout,
  refresh,
  me,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { changePassword, deleteAccount } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/me", authenticate, me);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", authenticate, changePassword);
router.delete("/delete-account", authenticate, deleteAccount);

export default router;
