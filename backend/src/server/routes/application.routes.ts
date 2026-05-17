import { Router } from 'express';
import { createApplication, updateApplication, getMyApplications, getApplicationById } from '../controllers/application.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', createApplication);
router.patch('/:id', updateApplication);
router.get('/', getMyApplications);
router.get('/:id', getApplicationById);

export default router;
