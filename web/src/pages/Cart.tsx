// CartList.tsx
import React, { useEffect, useState } from 'react';
import CartList from "../components/CartList";
import { deleteCart, getCarts } from '../service/cart';

interface Cart {
    _id: string;
    productId: string;
    quantity: number;
}

const CartIndex: React.FC = () => {

    const [carts, setCarts] = useState<Cart[]>([]);

    useEffect(() => {
        fetchCarts();
    }, []);

    const fetchCarts = async () => {
        try {
            const response = await getCarts();
            console.log("data------->", response)
            setCarts(response.data); // Assuming API returns an array of carts
        } catch (error) {
            console.error('Error fetching carts:', error);
        }
    };

    const handleDeleteCart = async (productId: string) => {
        try {
            const response = await deleteCart( JSON.stringify({ productId }))
            if (response.ok) {
                fetchCarts(); // Refresh the product list after adding a new product
            } else {
                console.error('Failed to remove product');
            }
        } catch (error) {
            console.error('Error remove product:', error);
        }
    };

    return (
        <div>
            {/* <CartForm onAddCart={handleAddCart} /> */}
            <CartList carts={carts} onDeleteCart={handleDeleteCart} />
        </div>
    );
};

export default CartIndex;
