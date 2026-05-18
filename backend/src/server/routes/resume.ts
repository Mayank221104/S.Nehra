import { Router, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";
import prisma from "../config/prisma";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed"));
  },
});

// GET /api/resume
router.get("/", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { resumeUrl: true },
    });
    res.json({ resumeUrl: user?.resumeUrl ?? null });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/resume/upload
router.post(
  "/upload",
  authenticate,
  upload.single("resume"),
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No file uploaded" });

      const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "resumes",
            public_id: `resume_${req.user!.id}`,
            overwrite: true,
            format: "pdf",
          },
          (error, data) => {
            if (error || !data) reject(error);
            else resolve(data as { secure_url: string });
          },
        );
        stream.end(req.file!.buffer);
      });

      const user = await prisma.user.update({
        where: { id: req.user!.id },
        data: { resumeUrl: result.secure_url },
      });

      res.json({ success: true, resumeUrl: user.resumeUrl });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
);

// DELETE /api/resume
router.delete("/", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    await cloudinary.uploader.destroy(`resumes/resume_${req.user!.id}`, {
      resource_type: "raw",
    });

    await prisma.user.update({
      where: { id: req.user!.id },
      data: { resumeUrl: null },
    });

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
