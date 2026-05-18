import { Router, Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../lib/prisma";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images allowed"));
  },
});

// GET /api/profile
router.get("/", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        name: true,
        email: true,
        resumeUrl: true,
        profile: {
          select: {
            phone: true,
            linkedinUrl: true,
            portfolioUrl: true,
            bio: true,
            location: true,
            currentRole: true,
            experienceYears: true,
            skills: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      name: user.name ?? "",
      email: user.email,
      resumeUrl: user.resumeUrl ?? null,
      phone: user.profile?.phone ?? "",
      linkedin: user.profile?.linkedinUrl ?? "",
      portfolio: user.profile?.portfolioUrl ?? "",
      bio: user.profile?.bio ?? "",
      location: user.profile?.location ?? "",
      currentRole: user.profile?.currentRole ?? "",
      experienceYears: user.profile?.experienceYears ?? null,
      skills: user.profile?.skills ?? [],
      avatarUrl: user.profile?.avatarUrl ?? null,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/profile
router.put("/", async (req: Request, res: Response) => {
  try {
    const {
      name,
      phone,
      linkedin,
      portfolio,
      bio,
      location,
      currentRole,
      experienceYears,
      skills,
    } = req.body;

    await prisma.user.update({
      where: { id: req.user!.id },
      data: { name },
    });

    await prisma.profile.upsert({
      where: { userId: req.user!.id },
      update: {
        phone,
        linkedinUrl: linkedin,
        portfolioUrl: portfolio,
        bio,
        location,
        currentRole,
        experienceYears: experienceYears ? parseInt(experienceYears) : null,
        skills: skills ?? [],
      },
      create: {
        userId: req.user!.id,
        phone,
        linkedinUrl: linkedin,
        portfolioUrl: portfolio,
        bio,
        location,
        currentRole,
        experienceYears: experienceYears ? parseInt(experienceYears) : null,
        skills: skills ?? [],
      },
    });

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/profile/avatar
router.post("/avatar", upload.single("avatar"), async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "avatars",
          public_id: `avatar_${req.user!.id}`,
          overwrite: true,
          transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face" }],
        },
        (error, result) => {
          if (error || !result) reject(error);
          else resolve(result as { secure_url: string });
        },
      );
      stream.end(req.file!.buffer);
    });

    await prisma.profile.upsert({
      where: { userId: req.user!.id },
      update: { avatarUrl: uploadResult.secure_url },
      create: { userId: req.user!.id, avatarUrl: uploadResult.secure_url },
    });

    res.json({ avatarUrl: uploadResult.secure_url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
