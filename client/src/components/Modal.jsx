import React from 'react';

const Modal = (props) => {
    
    const { isOpen, onClose, selectedItem } = props;

    if(!isOpen || !selectedItem){
        return null;
    }
    
    return (
      <div className={`fixed inset-0 ${isOpen ? 'block' : 'hidden'}`} style={{ zIndex: 9999 }}>
        <div className="flex items-center justify-center min-h-screen">
          
          <div className="relative bg-white w-full max-w-md p-6 rounded-md shadow-md z-10">
          <div className="relative">
              <img
                className="w-full h-64 object-cover"
                src="https://via.placeholder.com/600x360"
                alt="Placeholder"
              />
              <div className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">
                📍 {selectedItem.location.toUpperCase()}
              </div>
              <div className="absolute bottom-0 left-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">
                {selectedItem.name.toUpperCase()}
              </div>
            </div>
            <span className="absolute top-2 right-2 cursor-pointer font-bold" onClick={onClose}>
              &times;
            </span>
          </div>
        </div>
      </div>
    );
  };

export default Modal;