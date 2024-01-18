import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Register from './components/User/Register'
import Login from './components/User/Login'
import Services from './components/Services';
import NewService from './components/NewService';
import jwtDecode from 'jwt-decode';


function App() {
  const [isAuth, setIsAuth] = useState(!localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null);

  /*useEffect(() => {
    if(isAuth){
      const decodedUser = jwtDecode(isAuth);
      setCurrentUser(isAuth);
    }
  }, [isAuth]);*/

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  }

  return (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`flex justify-center items-center w-full`}>
      <div className={`w-full`}>
        <Router>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} handleLogout={handleLogout}/>
            <Routes>
              <Route path="/" element={<Services />}/>
              <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/new-service" element={<NewService />}/>
            </Routes>
        </Router>
      </div>
    </div>
  </div>
  );
}

export default App;
