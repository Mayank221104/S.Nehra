import { Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { AppError } from '../middleware/error.middleware';

export const createApplication = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { trackId, data } = req.body;

    const application = await prisma.application.create({
      data: {
        candidateId: req.user.id,
        trackId,
        data,
        status: 'SUBMITTED',
      },
    });

    await prisma.user.update({
      where: { id: req.user.id },
      data: { onboarded: true },
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

export const updateApplication = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { data, status, currentStep } = req.body;

    const application = await prisma.application.findUnique({ where: { id } });
    if (!application || application.candidateId !== req.user.id) {
      throw new AppError('Application not found', 404);
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        ...(data && { data }),
        ...(status && { status }),
        ...(currentStep && { currentStep }),
      },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (req: any, res: Response, next: NextFunction) => {
  try {
    const applications = await prisma.application.findMany({
      where: { candidateId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const application = await prisma.application.findUnique({
      where: { id },
      include: { candidate: { select: { name: true, email: true } } },
    });

    if (!application) throw new AppError('Application not found', 404);
    
    // Check access
    if (req.user.role === 'CANDIDATE' && application.candidateId !== req.user.id) {
      throw new AppError('Access denied', 403);
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
};
