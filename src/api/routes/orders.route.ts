import { Router } from 'express';
import { addOrder, getUserOrders, cancel, updateOrder } from '../controllers/orders.controller';
import { authToken } from '../middlewares/auth.middeleware';
import { validateOrderMongoId, validateOrderQueryParams, validateOrderReqBody } from '../middlewares/orders.middleware';

const router = Router();

router.get('/', authToken, validateOrderQueryParams, getUserOrders);
router.post('/add', authToken, validateOrderReqBody, addOrder);
router.put('/update/:id/:productId', authToken, validateOrderMongoId, updateOrder);
router.put('/cancel/:id', authToken, validateOrderMongoId, cancel);

export default router;