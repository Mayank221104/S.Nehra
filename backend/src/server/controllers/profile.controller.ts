import { Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { AppError } from '../middleware/error.middleware';

export const getProfile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
      include: { certifications: true, education: true },
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const profile = await prisma.profile.upsert({
      where: { userId: req.user.id },
      update: data,
      create: { ...data, userId: req.user.id },
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
