// modules/product/product.routes.ts
import express from 'express';
import productController from './controller/product.controller';
import { validateBody } from '../common/middleware/validate';
import { productSchema, productUpdateSchema } from './validation/product.validation';
import productMiddleware from '../common/middleware/query';
import { VerifyToken, VerifyUser } from '../common/middleware/verifyToken';

const router = express.Router();

router.post('/', VerifyToken, VerifyUser, validateBody(productSchema), productController.addProduct);
router.get('/', VerifyToken, productMiddleware, productController.getAllProducts);
router.get('/:productId', VerifyToken, productController.getProductById);
router.put('/:productId', VerifyToken, validateBody(productUpdateSchema), productController.updateProduct);
router.delete('/:productId', VerifyToken, productController.deleteProduct);

export default router;
