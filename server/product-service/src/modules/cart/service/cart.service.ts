// modules/product/service/product.service.ts
import CartRepository from '../repository/cart.repository';
import { CartItem as CartType } from '../model/cart.model';
// import { productSchema } from '../validation/product.validation';

class ProductService {
    async getAllCarts(): Promise<CartType[]> {
        return await CartRepository.getCartWithProductDetails();
    }

    async addCart(productData: CartType): Promise<CartType> {
        // await productSchema.validateAsync(productData);
        return await CartRepository.create(productData);
    }

    async getCartById(id: string): Promise<CartType | null> {
        return await CartRepository.findById(id);
    }

    async updateCart(id: string, productData: Partial<CartType>): Promise<CartType | null> {
        return await CartRepository.update(id, productData);
    }

    async deleteCart(id: string): Promise<CartType | null> {
        return await CartRepository.delete(id);
    }

    async getAllCartsByProductId(productId: string): Promise<CartType[]> {
        return await CartRepository.getAllByProductId(productId);
    }
}

export default new ProductService();
