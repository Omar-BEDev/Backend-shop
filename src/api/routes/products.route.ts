import { Router } from 'express';
import { addProduct, updateProduct, deleteProduct, getProducts } from '../controllers/products.controller';
import { authToken } from '../middlewares/auth.middeleware';
import { isHaveAccess } from '../middlewares/users.middleware';
import { validateProductMongoId, validateProductReqBody, validateQueryParams } from '../middlewares/products.middleware';

const router = Router();

router.get('/', validateQueryParams, getProducts);
router.post('/add', authToken, isHaveAccess, validateProductReqBody, addProduct);
router.put('/update/:id', authToken, isHaveAccess, validateProductMongoId, validateProductReqBody, updateProduct);
router.delete('/delete/:id', authToken, isHaveAccess, validateProductMongoId, deleteProduct);

export default router;