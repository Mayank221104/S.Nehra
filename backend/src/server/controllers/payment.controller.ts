import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import razorpay from "../config/razorpay";
import prisma from "../config/prisma";
import { AppError } from "../middleware/error.middleware";

export const createOrder = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { amount, description } = req.body; // Amount in INR
    const options = {
      amount: amount, // in rupees
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await prisma.payment.create({
      data: {
        userId: req.user.id,
        orderId: order.id,
        amount: options.amount,
        currency: "INR",
        status: "PENDING",
        description,
        receipt: options.receipt,
      },
    });

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "rzp_secret_fallback")
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      throw new AppError("Payment verification failed. Invalid signature.", 400);
    }

    // Update payment record
    await prisma.payment.update({
      where: { orderId: razorpay_order_id },
      data: {
        transactionId: razorpay_payment_id,
        status: "CAPTURED",
      },
    });

    // Send notification
    await prisma.notification.create({
      data: {
        userId: req.user.id,
        title: "Payment Successful",
        message: `Your payment of ID ${razorpay_payment_id} was successful.`,
        type: "PAYMENT",
      },
    });

    res.json({ status: "success", message: "Payment verified successfully" });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signature = req.headers["x-razorpay-signature"] as string;
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "webhook_secret_fallback";

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).send("Invalid signature");
    }

    const event = req.body.event;
    const payload = req.body.payload.payment.entity;

    if (event === "payment.captured") {
      await prisma.payment.update({
        where: { orderId: payload.order_id },
        data: { status: "CAPTURED", transactionId: payload.id },
      });
    } else if (event === "payment.failed") {
      await prisma.payment.update({
        where: { orderId: payload.order_id },
        data: { status: "FAILED", transactionId: payload.id },
      });
    }

    res.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};
