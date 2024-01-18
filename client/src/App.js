import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Register from './components/User/Register'
import Login from './components/User/Login'
import Services from './components/Services';
import NewService from './components/NewService';
function App() {
  return (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`flex justify-center items-center w-full`}>
      <div className={`w-full`}>
        <Router>
        <Navbar />
            <Routes>
              <Route path="/" element={<Services />}/>
              <Route path="/login" element={<Login />}/>
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
