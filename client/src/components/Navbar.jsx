import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 m-0 p-4 w-full">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-lg">Logo</div>
        <div className="space-x-4">
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300">About</a>
          <a href="#" className="text-white hover:text-gray-300">Services</a>
          <a href="#" className="text-white hover:text-gray-300">Contact</a>
        </div>
    </div>
  </nav>
  
  )
}
