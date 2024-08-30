// modules/product/controller/product.controller.ts
import { Request, Response } from 'express';
import ProductService from '../service/product.service';
import { errorResponse, successResponse } from '../../common/utils/response';
import { ProductDto } from './product.dto';

class ProductController {
    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const queryParams = {
                sort: req.query.sort,
                search: req.query.search,
                limit: req.query.limit,
            };
            const products = await ProductService.getAllProducts(queryParams);
            res.status(200).json(successResponse<ProductDto[]>(products));
        } catch (error: any) {
            res.status(500).json(errorResponse(error.message));
        }
    }

    async addProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await ProductService.addProduct(req.body);
            res.status(201).json(successResponse<ProductDto>(product, 'Product created successfully'));
        } catch (error: any) {
            res.status(500).json(errorResponse(error.message));
        }
    }

    async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.productId;
            const product = await ProductService.getProductById(productId);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.status(200).json(successResponse<ProductDto>(product));
        } catch (error: any) {
            res.status(500).json(errorResponse(error.message));
        }
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.productId;
            const updatedProduct = await ProductService.updateProduct(productId, req.body);
            if (!updatedProduct) {
                res.status(404).json(errorResponse('Product not found'));
                return;
            }
            res.status(200).json(successResponse<ProductDto>(updatedProduct, 'Product updated successfully'));
        } catch (error: any) {
            res.status(500).json(errorResponse(error.message));
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.productId;
            const deletedProduct = await ProductService.deleteProduct(productId);
            if (!deletedProduct) {
                res.status(404).json(errorResponse('Product not found'));
                return;
            }
            res.status(200).json(successResponse<ProductDto>(deletedProduct, 'Product deleted successfully'));
        } catch (error: any) {
            res.status(500).json(errorResponse(error.message));
        }
    }
}

export default new ProductController();
