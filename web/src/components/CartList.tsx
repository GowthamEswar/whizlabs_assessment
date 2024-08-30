// CartList.tsx
import React, { useEffect, useState } from 'react';
import './styles/style.css'

interface Cart {
	_id: string;
    productId: any;
    quantity: number;
}

interface CartListProps {
	carts: Cart[],
	onDeleteCart: (productId: string) => void;
}

const CartList: React.FC<CartListProps> = ({ carts, onDeleteCart } ) => {
	
	const [price, setPrice] = useState<number>(0);
	const [disable, setDisable] = useState<boolean>(false);

	useEffect(() => {
	  const totalPrice = carts.reduce((acc, item) => {
		const { productId, quantity } = item;
		const { price } = productId;
		return acc + (price * quantity);
	}, 0);

	setPrice(totalPrice)
	setDisable(false)
	}, [carts])

	const removeClicked = (id: any) => {
		setDisable(true)
		onDeleteCart(id)
	}

	return (
		<div>
			<h2>Cart List</h2>
			<p>Total price {price}</p>
			<div className='card-container'>
				{carts.map((product) => (
					<div className='card' key={product._id}>
						<h3>{product?.productId?.name}</h3>
						<p>quantity: ${product.quantity}</p>
						<button className='rm-button' disabled={disable} onClick={() => removeClicked(product.productId._id)}>Remove</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default CartList;
