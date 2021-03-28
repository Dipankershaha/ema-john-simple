import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    const saveCart = getDatabaseCart();
    const handleProceedCheckup = () => {
        history.push('/shipment');
    }
    useEffect(() => {
        //cart
        
        console.log(saveCart);
        const productKeys = Object.keys(saveCart);
        console.log(productKeys);

        fetch('http://localhost:5000/productsByKey',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(response => response.json())
        .then(data => {
            setCart(data);
            console.log(cart);
        })

    },[]);
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    } 
    return (
        <div className="twin-container">
           <div className="product-container">
                {
                    cart.map(pd => {
                        {pd.quantity = saveCart[pd.key]}
                     return <ReviewItem key={pd.key} product ={pd} removeProduct={removeProduct}></ReviewItem>
                })
                }
                {thankYou}
           </div>
           <div className="cart-container">
                <Cart cart={cart}>
                <button className="main-button" onClick={handleProceedCheckup}>Proceed Checkout</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;