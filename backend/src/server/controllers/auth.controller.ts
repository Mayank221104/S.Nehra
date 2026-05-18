import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import prisma from "../config/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
  getCookieOptions,
  verifyRefreshToken,
} from "../utils/jwt";
import { AppError } from "../middleware/error.middleware";
import { sendVerificationEmail, sendPasswordResetEmail } from "../utils/email";

// ─── Signup ───────────────────────────────────────────────────────────────────
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) throw new AppError("All fields required", 400);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new AppError("Email already registered", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "CANDIDATE",
        verifyCode,
        verifyCodeExpiry,
      },
    });

    await sendVerificationEmail(email, name, verifyCode);

    res.status(201).json({
      message: "User registered. Check email for verification code.",
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// ─── Verify Email ─────────────────────────────────────────────────────────────
export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) throw new AppError("Email and code required", 400);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError("User not found", 404);
    if (user.emailVerified) throw new AppError("Email already verified", 400);
    if (user.verifyCode !== code) throw new AppError("Invalid code", 400);
    if (!user.verifyCodeExpiry || user.verifyCodeExpiry < new Date()) {
      throw new AppError("Code expired. Request a new one.", 400);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, verifyCode: null, verifyCodeExpiry: null },
    });

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};

// ─── Resend Verification ──────────────────────────────────────────────────────
export const resendVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError("User not found", 404);
    if (user.emailVerified) throw new AppError("Already verified", 400);

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { verifyCode, verifyCodeExpiry },
    });

    await sendVerificationEmail(email, user.name ?? "User", verifyCode);
    res.json({ message: "Verification code sent" });
  } catch (error) {
    next(error);
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new AppError("Email and password required", 400);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) throw new AppError("Invalid credentials", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    if (!user.emailVerified) {
      throw new AppError("Please verify your email first", 403);
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken, lastLogin: new Date() },
    });

    res.cookie("accessToken", accessToken, getCookieOptions("access"));
    res.cookie("refreshToken", refreshToken, getCookieOptions("refresh"));

    res.json({
      message: "Logged in successfully",
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      await prisma.user
        .update({
          where: { refreshToken },
          data: { refreshToken: null },
        })
        .catch(() => {});
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// ─── Refresh Token ────────────────────────────────────────────────────────────
export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new AppError("Refresh token required", 401);

    const decoded = verifyRefreshToken(refreshToken) as any;
    if (!decoded) throw new AppError("Invalid or expired refresh token", 401);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || user.refreshToken !== refreshToken) throw new AppError("Token mismatch", 401);

    const payload = { id: user.id, email: user.email, role: user.role };
    const newAccessToken = generateAccessToken(payload);

    res.cookie("accessToken", newAccessToken, getCookieOptions("access"));
    res.json({ message: "Token refreshed" });
  } catch (error) {
    next(error);
  }
};

// ─── Me ───────────────────────────────────────────────────────────────────────
export const me = async (req: any, res: Response) => {
  res.json({ user: req.user });
};

// ─── Forgot Password ──────────────────────────────────────────────────────────
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success (security — don't reveal if email exists)
    if (!user) return res.json({ message: "If that email exists, a reset link has been sent." });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    await sendPasswordResetEmail(email, user.name ?? "User", resetToken);
    res.json({ message: "If that email exists, a reset link has been sent." });
  } catch (error) {
    next(error);
  }
};

// ─── Reset Password ───────────────────────────────────────────────────────────
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) throw new AppError("Token and password required", 400);

    const user = await prisma.user.findUnique({ where: { resetToken: token } });
    if (!user) throw new AppError("Invalid or expired reset token", 400);
    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new AppError("Reset token expired", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
    });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};
