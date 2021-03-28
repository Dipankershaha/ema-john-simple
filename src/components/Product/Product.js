import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img, name, seller, price,stock,key} = props.product;
    // console.log(props.product);
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h3 className="product-name"><Link to={"/product/"+key}>{name}</Link></h3>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <br/>
                <p><small>only {stock} left in stock - order soon</small></p>
                {props.showAddToCart && <button
                 className="main-button"
                 onClick={() => props.handleAddProduct(props.product)}
                 >
                     <FontAwesomeIcon icon={faShoppingCart} />Add To Cart</button>}
            </div>
           
           
        </div>
    );
};

export default Product;