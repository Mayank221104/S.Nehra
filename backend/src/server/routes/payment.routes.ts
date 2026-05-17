import { Router } from 'express';
import { createOrder, verifyPayment, handleWebhook } from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/create-order', authenticate, createOrder);
router.post('/verify', authenticate, verifyPayment);
router.post('/webhook', handleWebhook);

export default router;
