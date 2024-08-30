// modules/product/repository/product.repository.ts
import ProductModel, { Product as ProductType } from '../model/product.model';
import BaseRepository from '../../common/base.repository';

class ProductRepository extends BaseRepository<ProductType> {
    constructor() {
        super(ProductModel);
    }

    //specific methods changes can done id needed
}

export default new ProductRepository();
