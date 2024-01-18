import React, { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "./Modal";

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleBookClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/services/all");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao ir buscar os dados");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-10 md:px-20">
      {data.map((item) => (
        <div key={item.id} className="mb-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative">
              <img
                className="w-full h-64 object-cover"
                src="https://via.placeholder.com/600x360"
                alt="Placeholder"
              />
              <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">
                📍 {item.location.toUpperCase()}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-bold text-gray-800">
                  {item.name}
                </div>
                <div className="text-gray-500 text-sm">📞 {item.phone}</div>
              </div>
              <p className="text-gray-500 text-sm text-justify">
                {item.description}
              </p>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleBookClick(item)} className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} selectedItem={selectedItem} />
    </div>
  );
}
