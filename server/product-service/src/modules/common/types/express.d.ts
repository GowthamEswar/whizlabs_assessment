import { FilterQuery } from 'mongoose';
import { Product } from '../../product/model/product.model';

declare module 'express-serve-static-core' {
    interface Request {
        sort?: { [key: string]: 1 | -1 };
        filter?: FilterQuery<Product>;
        pagination?: {
            skip: number;
            limit: number;
        };
    }
}


