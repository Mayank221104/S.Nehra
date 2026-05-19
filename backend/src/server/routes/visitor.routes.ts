import { Router, Request, Response } from "express";
import prisma from "../config/prisma";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, phone, source } = req.body;
    if (!name?.trim() || !phone?.trim()) {
      return res.status(400).json({ message: "Name and phone required" });
    }
    const visitor = await prisma.visitor.create({
      data: { name: name.trim(), phone: phone.trim(), source: source ?? "popup" },
    });
    res.status(201).json({ success: true, id: visitor.id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (_req: Request, res: Response) => {
  try {
    const visitors = await prisma.visitor.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(visitors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
