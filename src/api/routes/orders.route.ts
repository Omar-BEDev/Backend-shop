import { Router } from 'express';
import {
  addOrder,
  getAllOrders,
  cancel,
  updateOrder,
} from '../controllers/orders.controller';
import { validateMongoId, validateQueryParams, validateReqBody } from '../middlewares/orders.middleware';

const router = Router();

router.route('/').post(validateReqBody, addOrder).get(validateQueryParams, getAllOrders);
router.route('/:id').get(validateMongoId,).patch(validateMongoId, cancel);
router.route('/:id/products/:productId').patch(validateMongoId, updateOrder);

export default router;
