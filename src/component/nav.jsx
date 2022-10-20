import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import './main-page.css'
import Search from './search'
import Signout from './signout'
function NavBar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
        <div className="nav">
          <div className="userID">
            <img src={currentUser.photoURL} alt=""/>
            <div className="userName1">
              <span className='useDisplayName'>{currentUser.displayName}</span> <br />
              <span className='status'>World of Creative Desginer</span>
            </div>
          </div>
          <div className="contect">
            <Signout/>
            <Search/>
            
            <div className="contect1">
              <div className="contect1DP"></div>
              <div className="contect1Name">
                Roland Luwang <br />
                <span className='status'>World of Creative Desginer</span>
              </div>
            </div>
            <div className="contect1">
              <div className="contect1DP"></div>
              <div className="contect1Name">
                Roland Luwang <br />
                <span className='status'>World of Creative Desginer</span>
              </div>
            </div>
            
            
          </div>
        </div>
    </div>
  )
}

export default NavBar