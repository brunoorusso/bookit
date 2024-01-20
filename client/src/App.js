import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Register from './components/User/Register'
import Login from './components/User/Login'
import Services from './components/Services';
import NewService from './components/NewService';
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";

function App() {
  const [authToken, setAuthToken] = useState(!localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      try {
        const decodedUser = jwtDecode(authToken);
        setCurrentUser(decodedUser);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, [authToken]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(false);
  }

  return (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`flex justify-center items-center w-full`}>
      <div className={`w-full`}>
        <Router>
        <Navbar currentUser={currentUser} handleLogout={handleLogout}/>
            <Routes>
              <Route path="/" element={<Services />}/>
              <Route path="/login" element={<Login authToken={authToken} setAuthToken={setAuthToken}/>}/>
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
