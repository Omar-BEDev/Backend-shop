import { Router } from 'express';
import { addProduct, updateProduct, deleteProduct, getProducts } from '../controllers/products.controller';
import { authToken } from '../middlewares/auth.middeleware';

const router = Router();

router.get('/', getProducts);
router.post('/add', authToken, addProduct);
router.put('/update/:id', authToken, updateProduct);
router.delete('/delete/:id', authToken, deleteProduct);

export default router;