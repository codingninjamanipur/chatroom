import React, { useState } from 'react';
import './resistration_forgot.scss';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { async } from '@firebase/util';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);
 
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(
                (err) => {     
                    setErr(true);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                        
                        // for authantication ====================>

                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });

                        // storing data after authantcation =====================>

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL, 
                        });

                        // enable other user by the registered user =============>

                        await setDoc(doc(db, "userChat", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        
                        
                            
                        
                    });
                    navigate("/login-page");
                }
            );
            
        }
        catch (err) {
            setErr(true);
        }

    };
  return (
    <div className='resistrationContainer'>
        <h1>Resister here</h1>
        <div className="cardContainer">
            <div className="cardItems">
                  <form onSubmit={handleSubmit} className='form'>
                    <label htmlFor="userName" className='userName'>User name:</label> <br />
                    <input type="text" className='nameInput'/><br />
                    <label htmlFor="email" className='userEmail'>Email Id:</label> <br />
                    <input type="email" className='emailInput'/><br />
                    <label htmlFor="password"className='userPassword'>Password:</label> <br />
                    <input type="password" className='passwordInput'/>
                    <input type="file" className='fileInput' />
                    <button className='button'>
                        Sign Up
                    </button>
                    {err && <span>Something went wrong</span>}
                </form>
                
            </div>
        </div>
        
    </div>
  )
}

export default Register;
