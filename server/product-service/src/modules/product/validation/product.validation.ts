// modules/product/dto/product.dto.ts
import Joi from 'joi';

export const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required()
});

export const productUpdateSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().min(0),
}).min(1);
