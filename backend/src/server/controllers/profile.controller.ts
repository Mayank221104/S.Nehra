import { Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { AppError } from "../middleware/error.middleware";

export const getProfile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
      include: { certifications: true, education: true },
    });
    res.json(profile ?? {});
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { phone, location, linkedinUrl, portfolioUrl, bio, skills, resumeUrl, avatarUrl } =
      req.body;

    const profile = await prisma.profile.upsert({
      where: { userId: req.user.id },
      update: {
        ...(phone !== undefined && { phone }),
        ...(location !== undefined && { location }),
        ...(linkedinUrl !== undefined && { linkedinUrl }),
        ...(portfolioUrl !== undefined && { portfolioUrl }),
        ...(bio !== undefined && { bio }),
        ...(skills !== undefined && { skills }),
        ...(resumeUrl !== undefined && { resumeUrl }),
        ...(avatarUrl !== undefined && { avatarUrl }),
      },
      create: {
        userId: req.user.id,
        phone,
        location,
        linkedinUrl,
        portfolioUrl,
        bio,
        skills: skills ?? [],
        resumeUrl,
        avatarUrl,
      },
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
