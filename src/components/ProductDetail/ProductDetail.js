import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch('http://localhost:5000/product/'+productKey)
        .then(response =>response.json())
        .then(data => setProduct(data))
    },[productKey])
    // const product = fakeData.find(pd => pd.key == productKey);
    return (
        <div>
            <h1>{productKey} comiing soon</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;