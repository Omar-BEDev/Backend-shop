import { Router } from 'express';
import {
  addOrder,
  getAllOrders,
  cancel,
  updateOrder,
} from '../controllers/orders.controller';

const router = Router();

router.route('/').post(addOrder).get(getAllOrders);
router.route('/:id').patch(cancel);
router.route('/:id/products/:productId').patch(updateOrder);

export default router;
