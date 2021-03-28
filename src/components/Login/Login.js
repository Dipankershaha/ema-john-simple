

import { useContext, useState } from 'react';
import {UserContext} from '../../App'
import { useHistory, useLocation } from "react-router";
import {createUserWithEmailAndPassword, initializeLoginFramework, resetPassword, signInWithEmailAndPassword} from './LoginManager';
import { handleGoogleSignIn, handleSignOut } from './LoginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSIgned: false,
    name: '',
    email: '',
    photo: '',
  });
  initializeLoginFramework();
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
    

}
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then((res) =>{
        handleResponse(res,true);
      })
  }  
  const signOut = () => {
    handleSignOut()
    .then((res) =>{
        handleResponse(res,false);
    })
}  

    

  const handleBlur = (event) =>{
    let isFormValid = true;
    console.log(event.target.name, event.target.value);
    if(event.target.name == 'email'){
      isFormValid =  /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isFormValid)
    }
    if(event.target.name == 'password'){
      const isPasswordValid = event.target.value.length >6;
      const passwordHasNumber  = /\d{1}/.test(event.target.value)
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
      
  }

  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then((res) => {
            handleResponse(res,true);
        })
    }
    if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password )
        .then((res) => {
            handleResponse(res,true);
    })
}
    e.preventDefault();
  }
  
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSIgned ? <button onClick={signOut}>Sign Out</button>
        : <button onClick={googleSignIn}>Sign In</button>
      }
      <br/>
      <button>Sign In Using Facebook</button>
      
      {
        user.isSIgned && <div>
        <p>Welcome {user.name}</p> 
        <p>Your Email: {user.email}</p>
        <img src={user.photo} alt=""/> 
        </div>
      }
      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
      {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name"/>}
      <br/>
      <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required/>
      <br/>
      <input type="password" name="password" onBlur={handleBlur} id="" placeholder="Your Password" required/>
      <br/>
      <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <button onClick={() =>(resetPassword(user.email))}>Forget or Reset Password</button>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>User {newUser ? 'Created': 'Logged In'} Successfully</p>}
    </div>
  );
}

export default Login;
