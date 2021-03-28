import React from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';


const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    const saveCart = getDatabaseCart();
    
    const total =cart.reduce( (total,prd)=> total+prd.price * saveCart[prd.key] , 0);
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const formatNumber = num => {
        const precision  = num.toFixed(2);
        return Number(precision);
    }
    const tax = formatNumber(total/10);
    const grandTotal = formatNumber(total +shipping + tax);
   
    return (
        <div>
           <h4>Order Summary</h4>
           <p>Items Ordertred: {cart.length}</p>
           <p>Product price {formatNumber(total)}</p> 
           <p><small>Shipping Cost: {shipping}</small></p>
           <p><small>Tax + Vat: {tax}</small></p>
           <p>Total price: {grandTotal}</p>
           <br/>
           {
                props.children
           }
           
        </div>
    );
};

export default Cart;