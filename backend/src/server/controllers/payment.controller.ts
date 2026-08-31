import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import razorpay from "../config/razorpay";
import prisma from "../config/prisma";
import { AppError } from "../middleware/error.middleware";

// ─── Server-side price catalogue ─────────────────────────────────────────────
// Frontend sends only trackId. Backend looks up the correct price.
// This means the user can NEVER manipulate the payment amount.
const TRACK_PRICES: Record<string, { name: string; priceINR: number }> = {
  "skill-development": { name: "Skill Development",       priceINR: 2999  },
  "sales-excellence":  { name: "Sales Excellence",        priceINR: 4949  },
  "customer-support":  { name: "Customer Support Mastery",priceINR: 4999  },
  "web-development":   { name: "Web Development",         priceINR: 14999 },
  "marketing-growth":  { name: "Marketing & Growth",      priceINR: 4999  },
  "data-analytics":    { name: "Data Analytics",          priceINR: 14999 },
  "ecommerce":         { name: "E-Commerce",              priceINR: 4999  },
};

// ─── Create Razorpay Order ────────────────────────────────────────────────────
export const createOrder = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { trackId } = req.body;

    // 1. Validate trackId exists in our catalogue
    const track = TRACK_PRICES[trackId];
    if (!track) {
      throw new AppError(`Invalid track: "${trackId}"`, 400);
    }

    // 2. Price comes from server — never from frontend
    const amountPaise = track.priceINR * 100;

    const options = {
      amount: amountPaise,
      currency: "INR",
      receipt: `rcpt_${trackId}_${Date.now()}`,
      notes: {
        trackId,
        trackName: track.name,
        userId: req.user.id,
      },
    };

    const order = await razorpay.orders.create(options);

    // 3. Save payment record with track info
    await prisma.payment.create({
      data: {
        userId:      req.user.id,
        orderId:     order.id,
        amount:      amountPaise,
        currency:    "INR",
        status:      "PENDING",
        trackId,
        trackName:   track.name,
        description: `Enrollment: ${track.name}`,
        receipt:     options.receipt,
      },
    });

    // 4. Return what frontend needs to open Razorpay checkout
    res.json({
      orderId:   order.id,
      amount:    amountPaise,
      currency:  "INR",
      trackName: track.name,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Verify Payment After Razorpay Checkout ──────────────────────────────────
export const verifyPayment = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // 1. Cryptographic signature check — this is what prevents fake verifications
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      throw new AppError("Payment verification failed. Invalid signature.", 400);
    }

    // 2. Update payment record to CAPTURED
    const payment = await prisma.payment.update({
      where: { orderId: razorpay_order_id },
      data: {
        transactionId: razorpay_payment_id,
        status: "CAPTURED",
      },
    });

    // 3. Send enrollment confirmation notification
    await prisma.notification.create({
      data: {
        userId:  req.user.id,
        title:   "Enrollment Confirmed 🎉",
        message: `Your enrollment in ${payment.trackName} is confirmed. Payment ID: ${razorpay_payment_id}`,
        type:    "PAYMENT",
      },
    });

    res.json({
      status:    "success",
      message:   "Payment verified successfully",
      trackName: payment.trackName,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Razorpay Webhook (server-to-server) ─────────────────────────────────────
export const handleWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signature = req.headers["x-razorpay-signature"] as string;
    const secret    = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).send("Invalid signature");
    }

    const event   = req.body.event;
    const payload = req.body.payload.payment.entity;

    if (event === "payment.captured") {
      await prisma.payment.update({
        where: { orderId: payload.order_id },
        data:  { status: "CAPTURED", transactionId: payload.id },
      });
    } else if (event === "payment.failed") {
      await prisma.payment.update({
        where: { orderId: payload.order_id },
        data:  { status: "FAILED", transactionId: payload.id },
      });
    } else if (event === "payment.refunded") {
      await prisma.payment.update({
        where: { orderId: payload.order_id },
        data:  { status: "REFUNDED" },
      });
    }

    res.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};