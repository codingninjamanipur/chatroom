import React from 'react'
import {  Link } from 'react-router-dom';
// import { signInWithEmailAndPassword } from "firebase/auth";
import './login-page.css';
// import { auth } from '../firebase';
const Login = () => {

    
    
  return (
    <div className='logInContainer'>
        <h1>LogIn here</h1>
        <div className="cardContainer">
            <div className="cardItems">
                <form action="" className='form' >
                    <label htmlFor="userName" className='userName'>Email ID:</label> <br />
                    <input type="text" id='userName' className='userInput'/><br />
                    <label htmlFor="pasword"className='userPassword'>Password:</label> <br />
                    <input type="password" className='userInput' />
                    <div className='fPass'>
                    <Link to={"/register"} className='forgotPass'>Forgot Passsword</Link>
                    <Link to={"/register"} className='newUser'>New User?</Link>
                    </div>
                    <button className='button'>
                        Sign In
                    </button>
                    {/* {err && <span>Something went wrong</span>} */}
                </form>
                
            </div>
        </div>
        
    </div>
  )
}

export default Login;
