import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "S.Nehra <onboarding@resend.dev>";

export const sendVerificationEmail = async (email: string, name: string, code: string) => {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Verify your email — S.Nehra",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 24px">
        <h1 style="font-size:24px;font-weight:600;color:#0a0a0a">Hi ${name},</h1>
        <p style="color:#666;margin-top:8px">Your verification code is:</p>
        <div style="margin:32px 0;text-align:center">
          <span style="font-size:48px;font-weight:700;letter-spacing:12px;color:#0a0a0a">${code}</span>
        </div>
        <p style="color:#666;font-size:14px">This code expires in 15 minutes.</p>
        <p style="color:#999;font-size:12px;margin-top:32px">If you didn't create an account, ignore this email.</p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, name: string, token: string) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Reset your password — S.Nehra",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 24px">
        <h1 style="font-size:24px;font-weight:600;color:#0a0a0a">Reset your password</h1>
        <p style="color:#666;margin-top:8px">Hi ${name}, click the button below to reset your password.</p>
        <div style="margin:32px 0;text-align:center">
          <a href="${resetUrl}" style="background:#0a0a0a;color:#fff;padding:14px 32px;border-radius:14px;text-decoration:none;font-size:14px;font-weight:500">
            Reset password
          </a>
        </div>
        <p style="color:#666;font-size:14px">This link expires in 1 hour.</p>
        <p style="color:#999;font-size:12px;margin-top:32px">If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
};
