import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './component/login-page';
import MainPage from './component/main-page';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/main-page' element={<MainPage/>} />
    </Routes>
  </Router>
);


