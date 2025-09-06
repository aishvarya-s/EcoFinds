import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image_url} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <Link to={`/products/${product.id}`}>View Details</Link>
        </div>
    );
};

export default ProductCard;