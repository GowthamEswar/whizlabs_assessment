// ProductList.tsx
import React, { useEffect, useState } from 'react';
import ProductList from "../components/ProductList";
import ProductForm from '../components/ProductForm';
import { createProduct, deleteProduct, getProducts } from '../service/product';
import { addTOCarts } from '../service/cart';

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
}

const ProductIndex: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [showAddBtn, setShowAddBtn] = useState<boolean>(false);

    useEffect(() => {
        const user: any = localStorage.getItem("user")
        const userType = JSON.parse(user).type
        if(userType !== 'BUYER') setShowAddBtn(true)
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data); // Assuming API returns an array of products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddProduct = async (newProduct: Product) => {
        setShow(false)
        try {
            const response = await createProduct(JSON.stringify(newProduct))
            if (response.ok) {
                fetchProducts(); // Refresh the product list after adding a new product
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            const response = await deleteProduct(productId)
            if (response.ok) {
                fetchProducts(); // Refresh the product list after deleting a product
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAddCart = async (productId: string) => {
        try {
            const response = await addTOCarts(JSON.stringify({ productId }))
            if (response.ok) {
                fetchProducts(); // Refresh the product list after adding a new product
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <div className='header-container'>
                <h2>Product List</h2>
              {showAddBtn && <button className='add-button' onClick={() => setShow(true)}>Add Product</button>}  
            </div>
            {show && <ProductForm onAddProduct={handleAddProduct} />}
            <ProductList products={products} onDeleteProduct={handleDeleteProduct} onAddProduct={handleAddCart} />
        </div>
    );
};

export default ProductIndex;
