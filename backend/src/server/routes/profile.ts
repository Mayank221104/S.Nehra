import "dotenv/config";
import { Router, Response } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";
import prisma from "../config/prisma";

const router = Router();
router.use(authenticate);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images allowed"));
  },
});

// GET /api/profile
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        name: true,
        email: true,
        profile: {
          select: {
            phone: true,
            linkedinUrl: true,
            portfolioUrl: true,
            bio: true,
            location: true,
            skills: true,
            avatarUrl: true,
            resumeUrl: true,
          },
        },
      },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({
      name: user.name ?? "",
      email: user.email,
      phone: user.profile?.phone ?? "",
      linkedinUrl: user.profile?.linkedinUrl ?? "",
      portfolioUrl: user.profile?.portfolioUrl ?? "",
      bio: user.profile?.bio ?? "",
      location: user.profile?.location ?? "",
      skills: user.profile?.skills ?? [],
      avatarUrl: user.profile?.avatarUrl ?? null,
      resumeUrl: user.profile?.resumeUrl ?? null,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/profile
router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const { name, phone, linkedinUrl, portfolioUrl, bio, location, skills } = req.body;
    if (name) await prisma.user.update({ where: { id: req.user!.id }, data: { name } });
    await prisma.profile.upsert({
      where: { userId: req.user!.id },
      update: { phone, linkedinUrl, portfolioUrl, bio, location, skills: skills ?? [] },
      create: {
        userId: req.user!.id,
        phone,
        linkedinUrl,
        portfolioUrl,
        bio,
        location,
        skills: skills ?? [],
      },
    });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/profile/avatar
router.post("/avatar", upload.single("avatar"), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "avatars",
          public_id: `avatar_${req.user!.id}`,
          overwrite: true,
          transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face" }],
        },
        (error, data) => {
          if (error || !data) reject(error);
          else resolve(data as { secure_url: string });
        },
      );
      stream.end(req.file!.buffer);
    });
    await prisma.profile.upsert({
      where: { userId: req.user!.id },
      update: { avatarUrl: result.secure_url },
      create: { userId: req.user!.id, avatarUrl: result.secure_url },
    });
    res.json({ avatarUrl: result.secure_url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
