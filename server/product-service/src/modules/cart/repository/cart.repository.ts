// modules/cart/repository/cart.repository.ts
import CartItemModel, { CartItem as CartItemType } from '../model/cart.model';
import BaseRepository from '../../common/base.repository';

class CartRepository extends BaseRepository<CartItemType> {
    constructor() {
        super(CartItemModel);
    }

     // You can add specific methods related to cart items if needed
    async getAllByProductId(productId: string): Promise<CartItemType[]> {
        return await this.findAllByField('productId', productId);
    }

    async getCartWithProductDetails(): Promise<CartItemType[]> {
        return await this.model
            .find({})
            .populate('productId') // Assuming 'productId' is a reference to Product model
            .exec();
    }

}

export default new CartRepository();
