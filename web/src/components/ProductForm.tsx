import React, { useState } from 'react';
import './styles/style.css'

interface Props {
    onAddProduct: (newProduct: Product) => Promise<void>; // Update type to expect a promise
}

interface Product {
    _id?: string;
    name: string;
    price: number;
    description: string;
}

const ProductForm: React.FC<any> = ({ onAddProduct }) => {
    const [product, setProduct] = useState<Product>({
        name: '',
        price: 0,
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await onAddProduct(product);
            // Optionally, reset the form fields after submission
            setProduct({
                name: '',
                price: 0,
                description: ''
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="modal_overlay">
            <div className="modal_container">
                <div className="modal_header"></div>
                <div className="graph_filter_body">
                    <form className="product-form" onSubmit={handleSubmit}>
                        <label className="form-label">
                            Name:
                            <input
                                className="form-input"
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label className="form-label">
                            Price:
                            <input
                                className="form-input"
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </label>
                        <br />
                        <label className="form-label">
                            Description:
                            <textarea
                                className="form-textarea"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <button className="form-button" type="submit">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
