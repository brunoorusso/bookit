import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 m-0 p-4 w-full">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-lg">Logo</div>
        <div className="space-x-4">
          <Link to="/login" className="text-white hover:text-gray-300">Sign in</Link>
          <Link to="/new-service" className="text-white hover:text-gray-300">New Service</Link>
        </div>
      </div>
    </nav>
  );
};
