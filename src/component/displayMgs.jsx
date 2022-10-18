import React from 'react'
import InputMgses from './input'
import './main-page.css'
import Messages from './messages'
import MgsHeader from './mgsHeader'
function DisplayMgs() {
  return (
    <div className="displayMgs">
        <MgsHeader />
        <div className="messageContainerBackground">
          <Messages />
          <InputMgses />
        </div>
        
    </div>

  )
}

export default DisplayMgs