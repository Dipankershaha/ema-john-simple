import React from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import {UserContext} from '../../App'
import './Shipment.css' 
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
      
      const saveCart = getDatabaseCart();
      console.log(saveCart);
      const orderDetails = {...loggedInUser,products:saveCart,shipment:data, orderTime: new Date()}
      fetch('http://localhost:5000/addOrder',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(response => response.json())
      .then(data => {
        if(data){
          processOrder();
          alert('placed the order successfully')
        }
      })
    }
  
    console.log(loggedInUser);
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
        {errors.name && <span className="error">name is required</span>}
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
        {errors.name && <span className="error">email is required</span>}
        <input name="address" ref={register({ required: true })} placeholder="Your Address" />
        {errors.name && <span className="error">address is required</span>}
        <input name="phone" ref={register({ required: true })} placeholder="Your Phone"/>
        {errors.name && <span className="error">phone is required</span>}
        <input type="submit" />
      </form>
    );
};

export default Shipment;