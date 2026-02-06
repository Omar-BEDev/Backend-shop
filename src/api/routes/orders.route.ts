import { Router } from 'express';
import { addOrder, getUserOrders, cancel, updateOrder, getAdminAllOrders } from '../controllers/orders.controller';
import { authToken } from '../middlewares/auth.middeleware';
import { validateOrderMongoId, validateOrderQueryParams, validateOrderReqBody } from '../middlewares/orders.middleware';
import { isHaveAccess } from '../middlewares/users.middleware';

const router = Router();

router.get('/', authToken, validateOrderQueryParams, getUserOrders);
router.post('/add', authToken, validateOrderReqBody, addOrder);
router.put('/update/:id/:productId', authToken, validateOrderMongoId, updateOrder);
router.put('/cancel/:id', authToken, validateOrderMongoId, cancel);
router.get("/statistics",authToken,isHaveAccess,getAdminAllOrders)
export default router;