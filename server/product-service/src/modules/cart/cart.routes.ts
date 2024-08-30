// modules/product/product.routes.ts
import express from 'express';
import CartController from './controller/cart.controller';

const router = express.Router();

router.post('', CartController.addCart);
router.post('/remove', CartController.removeCart);
router.get('', CartController.getAllCarts);
// router.get('/:cartId', CartController.getCartById);
// router.put('/:cartId', CartController.updateCart);
// router.delete('/:cartId', CartController.deleteCart);

export default router;
