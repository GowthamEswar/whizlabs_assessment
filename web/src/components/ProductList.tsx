// ProductList.tsx
import React, { useEffect, useState } from 'react';
import './styles/style.css'

interface Product {
	_id: string;
	name: string;
	price: number;
	description: string;
}

interface ProductListProps {
	products: Product[],
	onDeleteProduct: (productId: string) => void;
	onAddProduct: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDeleteProduct,  onAddProduct} ) => {

	const [disable, setDisable] = useState<boolean>(false);

	
	useEffect(() => {
	  setDisable(false)
	  }, [products])

	const addClicked = (id: any) => {
		setDisable(true)
		onAddProduct(id)
	}

	return (
		<div>
			<div className='card-container'>
				{products.map((product) => (
					<div className='card' key={product._id}>
						<h3>{product.name}</h3>
						<p>{product.description}</p>
						<p>Price: ${product.price}</p>
						{/* <button onClick={() => onDeleteProduct(product._id)}>Delete</button> */}
						<button className='add-button' disabled={disable} onClick={() => addClicked(product._id)}>Add To Cart</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductList;
