// middleware/product.middleware.ts
import { Request, Response, NextFunction } from 'express';

const productMiddleware = (req: any, res: Response, next: NextFunction) => {
    if (req.query.sort) {
        req.query.sort = req.query.sort.toString();
    }

    if (req.query.search) {
        req.query.search = req.query.search.toString();
    }

    if (req.query.limit) {
        req.query.limit = parseInt(req.query.limit.toString(), 10);
    }

    next();
};

export default productMiddleware;
