import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './login-page.css';
const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const email = e.target[0].value;
        const password = e.target[1].value;
        

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        }
        catch (err) {
            setErr(true);
        }

    };
    
    
  return (
    <div className='logInContainer'>
        <h1>LogIn here</h1>
        <div className="cardContainer">
            <div className="cardItems">
                <form action="" className='form' onSubmit={handleSubmit}>
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
                    {err && <span>Something went wrong</span>}
                </form>
                
            </div>
        </div>
        
    </div>
  )
}

export default Login;
