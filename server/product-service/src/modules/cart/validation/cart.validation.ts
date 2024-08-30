// modules/cart/validation/cart.validation.ts
import Joi from 'joi';

export const addToCartSchema = Joi.object({
    productId: Joi.string().required(),
});

export const updateCartItemQuantitySchema = Joi.object({
    quantity: Joi.number().integer().min(1).required(),
});
