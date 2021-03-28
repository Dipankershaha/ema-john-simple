import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
//  const first10 = fakeData.slice(0,10);
 const [products, setProducts] = useState([]);
 const [cart, setCart] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(data => setProducts(data))
    },[])
    useEffect(() => {
        //cart
        const saveCart = getDatabaseCart();
        console.log(saveCart);
        const productKeys = Object.keys(saveCart);
        fetch('http://localhost:5000/productsByKey',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(response => response.json())
        .then(data => setCart(data))
        
        
    },[]);

 const handleAddProduct = (product)=>{
    // console.log('product added', product);
    const toBeAddedKey = product.key;
    // console.log(cart);
    const sameProduct  = cart.find( pd  => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    // console.log(sameProduct);
    if (sameProduct){
        count = sameProduct.quantity + 1;
        console.log(count);
        sameProduct.quantity = count;
        const others  = cart.filter( pd  => pd.key !== toBeAddedKey);
        newCart = [...others, sameProduct];
    }
    else{
        product.quantity = 1;
        newCart = [...cart, product];

    }
    console.log(newCart);
    setCart(newCart);
    console.log(cart);
    addToDatabaseCart(product.key, count);
    
 }

    return (
        <div className="twin-container">
            <div className="product-container">
                
                {
                    products.map(product => <Product 
                        key = {product.key}
                        handleAddProduct ={handleAddProduct}
                        product={product}
                        showAddToCart ={true}
                        ></Product>)
                }
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="main-button">Review Order</button></Link>
                </Cart>
               
            </div>
            
            
        </div>
    );
};

export default Shop;