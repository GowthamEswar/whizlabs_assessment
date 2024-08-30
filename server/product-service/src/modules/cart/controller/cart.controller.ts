// modules/cart/controller/cart.controller.ts
import { Request, Response } from 'express';
import CartService from '../service/cart.service';
import { addToCartSchema } from '../validation/cart.validation';
import { CartDto } from './cart.dto';
import { errorResponse, successResponse } from '../../common/utils/response';

class CartController {
    async getAllCarts(req: Request, res: Response): Promise<void> {
        try {
            const carts = await CartService.getAllCarts();
            res.status(200).json(successResponse<CartDto[]>(carts));
        } catch (error: any) {
            res.status(500).json(errorResponse(error.message));
        }
    }

    async addCart(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = await addToCartSchema.validateAsync(req.body);
            const productId = validatedData.productId
            const cart = await CartService.getAllCartsByProductId(productId);
            const cartItem: any = cart[0]
            if (cart.length === 0) {
                const cart = await CartService.addCart(req.body);
                res.status(201).json(successResponse<CartDto>(cart, 'cart created successfully'));
            } else {
                const updatedcart = await CartService.updateCart(cartItem._id, { quantity: cartItem.quantity + 1 });
                res.status(200).json(successResponse<CartDto | null>(updatedcart, 'Cart updated successfully'));
            }

        } catch (error: any) {
            res.status(500).json(errorResponse(error.message));
        }
    }

    async removeCart(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = await addToCartSchema.validateAsync(req.body);
            const productId = validatedData.productId
            const cart = await CartService.getAllCartsByProductId(productId);
            const cartItem: any = cart[0]
            if (cart.length === 0) {
                res.status(404).json(errorResponse('cart not found'));
            }
            console.log(cartItem)
            if (cartItem.quantity === 1) {
                const deletedcart = await CartService.deleteCart(cartItem._id);
                res.status(200).json(successResponse<CartDto | null>(deletedcart, 'Cart removed successfully'));
            } else {
                const updatedcart = await CartService.updateCart(cartItem._id, { quantity: cartItem.quantity - 1 });
                res.status(200).json(successResponse<CartDto | null>(updatedcart, 'Cart removed successfully'));
            }
            

        } catch (error: any) {
            res.status(500).json(errorResponse(error.message));
        }
    }

    // async getCartById(req: Request, res: Response): Promise<void> {
    //     try {
    //         const cartId = req.params.cartId;
    //         const cart = await CartService.getCartById(cartId);
    //         if (!cart) {
    //             res.status(404).json({ message: 'cart not found' });
    //             return;
    //         }
    //         res.status(200).json(successResponse<CartDto>(cart, 'requested successfully'));
    //     } catch (error: any) {
    //         res.status(500).json(errorResponse(error.message));
    //     }
    // }

    // async updateCart(req: Request, res: Response): Promise<void> {
    //     try {
    //         const cartId = req.params.cartId;
    //         // const validatedData = await cartSchema.validateAsync(req.body);
    //         const updatedcart = await CartService.updateCart(cartId, req.body);
    //         if (!updatedcart) {
    //             res.status(404).json(errorResponse('Cart not found'));
    //             return;
    //         }
    //         res.status(200).json(successResponse<CartDto>(updatedcart, 'Cart updated successfully'));
    //     } catch (error: any) {
    //         res.status(500).json(errorResponse(error.message));
    //     }
    // }

    // async deleteCart(req: Request, res: Response): Promise<void> {
    //     try {
    //         const cartId = req.params.cartId;
    //         const deletedcart = await CartService.deleteCart(cartId);
    //         if (!deletedcart) {
    //             res.status(404).json(errorResponse('Cart not found'));
    //             return;
    //         }
    //         res.status(200).json(successResponse<CartDto>(deletedcart, 'Cart deleted successfully'));
    //     } catch (error: any) {
    //         res.status(500).json(errorResponse(error.message));
    //     }
    // }
}

export default new CartController();
