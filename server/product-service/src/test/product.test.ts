// modules/product/routes/product.routes.test.ts
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from '../modules/product/product.routes';
import Product from '../modules/product/model/product.model';
import dotenv from 'dotenv';

// Setup Express app for testing
const app = express();
// @ts-ignore
app.use(express.json());
app.use('/product', productRoutes);
dotenv.config();

describe('Product API', () => {
    let server: any;

    beforeAll(async () => {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        server = app.listen(4000);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
        server.close();
    });

    describe('POST /product', () => {
        it('should create a new product', async () => {
            const response = await request(app)
                .post('/product')
                .send({ name: 'Test Product', description: 'Test Description', price: 100 });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('name', 'Test Product');
            expect(response.body).toHaveProperty('description', 'Test Description');
            expect(response.body).toHaveProperty('price', 100);
        });

        it('should return validation error for invalid data', async () => {
            const response = await request(app)
                .post('/product')
                .send({ name: '', description: 'Test Description', price: -100 });

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /product/:id', () => {
        let productId: string;

        beforeEach(async () => {
            const product = new Product({ name: 'Test Product', description: 'Test Description', price: 100 });
            const savedProduct = await product.save();
            productId = savedProduct._id!.toString(); // Explicit type assertion
        });

        it('should fetch a product by id', async () => {
            const response = await request(app).get(`/product/${productId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('_id', productId);
            expect(response.body).toHaveProperty('name', 'Test Product');
            expect(response.body).toHaveProperty('description', 'Test Description');
            expect(response.body).toHaveProperty('price', 100);
        });

        it('should return 404 for non-existing product', async () => {
            const response = await request(app).get(`/product/${new mongoose.Types.ObjectId()}`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Product not found' });
        });
    });

    describe('GET /product', () => {
        it('should fetch all products', async () => {
            const response = await request(app).get('/product');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('PUT /product/:id', () => {
        let productId: string;

        beforeEach(async () => {
            const product = new Product({ name: 'Test Product', description: 'Test Description', price: 100 });
            const savedProduct = await product.save();
            productId = savedProduct._id!.toString(); // Explicit type assertion
        });

        it('should update product details', async () => {
            const response = await request(app)
                .put(`/product/${productId}`)
                .send({ name: 'Updated Product', description: 'Updated Description', price: 150 });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('_id', productId);
            expect(response.body).toHaveProperty('name', 'Updated Product');
            expect(response.body).toHaveProperty('description', 'Updated Description');
            expect(response.body).toHaveProperty('price', 150);
        });

        it('should return validation error for invalid data', async () => {
            const response = await request(app)
                .put(`/product/${productId}`)
                .send({ name: '', description: 'Updated Description', price: -150 });

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error');
        });

        it('should return 404 for non-existing product', async () => {
            const response = await request(app)
                .put(`/product/${new mongoose.Types.ObjectId()}`)
                .send({ name: 'Updated Product', description: 'Updated Description', price: 150 });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Product not found' });
        });
    });
});