import { Router } from 'express';
import prisma from '../config/prisma';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, authorize(['ADMIN']), async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, onboarded: true, createdAt: true }
  });
  res.json(users);
});

export default router;
