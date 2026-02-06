import { Router } from 'express';
import { addOrder, getUserOrders, cancel, updateOrder } from '../controllers/orders.controller';
import { authToken } from '../middlewares/auth.middeleware';

const router = Router();

router.get('/', authToken, getUserOrders);
router.post('/add', authToken, addOrder);
router.put('/update/:id/:productId', authToken, updateOrder);
router.put('/cancel/:id', authToken, cancel);

export default router;