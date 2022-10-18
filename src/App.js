import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Login from './component/login-page';
import MainPage from './component/main-page';
import Register from './component/register-page';
import { AuthContext } from './context/authContext';

function App() {
  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = (props) => {


    if (!currentUser) {
      return <Navigate to = "/login-page"/>
    }
    else
      return <>{ props.children}</>
  }
  
  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route index 
            element={
              <ProtectedRoute>
                <MainPage/>
              </ProtectedRoute>
            } 
          />
          <Route path='login-page' element={<Login/>} />
          <Route path='register' element={<Register/>} />
        </Route>
      </Routes>
    </Router>
    
  )
}

export default App