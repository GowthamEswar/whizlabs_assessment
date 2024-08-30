// modules/product/service/product.service.ts
import ProductRepository from '../repository/product.repository';
import productModel, { Product as ProductType } from '../model/product.model';
import mongoose from 'mongoose';

class ProductService {
    async getAllProducts(queryParams: any): Promise<ProductType[]> {
        // return await ProductRepository.findAll();
        const { sort, search, limit } = queryParams;

        let aggregationPipeline: any[] = [];

        // Sorting
        if (sort) {
            const sortParams = sort.toString().split(',');
            const sortObj: any = {};
            sortParams.forEach((param: string) => {
                const [field, order] = param.split(':');
                sortObj[field?.trim()] = order?.trim() === 'desc' ? -1 : 1;
            });
            aggregationPipeline.push({ $sort: sortObj });
        }

        // Filtering
        if (search) {
            const searchObj: any = { name: { $regex: search, $options: 'i' } }; // case-insensitive search
            aggregationPipeline.push({ $match: searchObj });
        }

        // Limiting
        if (limit) {
            aggregationPipeline.push({ $limit: parseInt(limit.toString(), 10) });
        }

        // If the pipeline is empty, just use a match all documents stage
        if (aggregationPipeline.length === 0) {
            aggregationPipeline.push({ $match: {} });
        }

        return await productModel.aggregate(aggregationPipeline);
    }

    async addProduct(productData: ProductType): Promise<ProductType> {
        return await ProductRepository.create(productData);
    }

    async getProductById(id: string): Promise<ProductType | null> {
        return await ProductRepository.findById(id);
    }

    async updateProduct(id: string, productData: Partial<ProductType>): Promise<ProductType | null> {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid product ID format');
        }
        return await ProductRepository.update(id, productData);
    }

    async deleteProduct(id: string): Promise<ProductType | null> {
        return await ProductRepository.delete(id);
    }
}

export default new ProductService();
