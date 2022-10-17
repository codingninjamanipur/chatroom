import React from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import "./signOut.scss"

function Signout() {
  return (
    <div className='signOutButton'>
        <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  )
}

export default Signout