import React, { useState, useEffect } from "react";
import api from "../services/api";

const Modal = (props) => {
  const { isOpen, onClose, selectedItem, currentUser } = props;
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [available, setAvailable] = useState("bg-green-500");

  useEffect(() => {
    if (isOpen) {
      // Atualiza a data quando o modal é aberto
      setSelectedDate(new Date());
    } else {
      setSelectedTime(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/appointments/${selectedItem._id}`);

      } catch (error) {
        console.error("Erro ao ir buscar os dados");
      }
    };
    fetchData();
  }, [selectedItem]);

  if (!isOpen || !selectedItem) {
    return null;
  }

  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);
    if (newDate >= today && newDate <= maxDate) {
      setSelectedDate(newDate);
    }
  };

  const handleTimeClick = (clickedTime) => {
    setSelectedTime(clickedTime);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const appointmentData = {
        userId: currentUser.userId,
        serviceId: selectedItem._id,
        time: selectedTime,
        date: selectedDate.toISOString(),
      };

      console.log("Dados do agendamento a serem enviados:", appointmentData);

      const response = await api.post("/appointments/new", appointmentData);
    } catch (error) {
      console.error("Erro ao enviar dados", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 ${isOpen ? "block" : "hidden"}`}
      style={{ zIndex: 9999 }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white w-full max-w-md p-6 rounded-md shadow-md z-10">
          <div className="relative">
            <img
              className="w-full h-64 object-cover rounded-md"
              src="https://via.placeholder.com/600x360"
              alt="Placeholder"
            />
            <div className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">
              📍 {selectedItem.location.toUpperCase()}
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 rounded-md">
              <p className="font-bold text-left text-white py-2 ml-5">
                {selectedItem.name.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex items-center mt-3">
            <hr className="flex-grow border-b-2 border-gray-300 mr-4" />
            <p className="text-gray-600 font-semibold">Availability</p>
            <hr className="flex-grow border-b-2 border-gray-300 ml-4" />
          </div>
          <div className="flex items-center justify-center mt-3">
            {/* Botão para voltar um dia */}
            <button
              className="text-gray-500 hover:text-gray-700 mx-2 text-3xl"
              onClick={() => handleDateChange(-1)}
            >
              &#8249;
            </button>

            {/* Exibir data centralizada */}
            <p className="text-gray-600 font-semibold text-xl">
              {formatDate(selectedDate)}
            </p>

            {/* Botão para avançar um dia */}
            <button
              className="text-gray-500 hover:text-gray-700 mx-2 text-3xl"
              onClick={() => handleDateChange(1)}
            >
              &#8250;
            </button>
          </div>
          <div className="flex items-center mt-3 justify-center">
            <div className="grid grid-cols-3 gap-4">
            {selectedItem.availability.map((time) => (
                <div
                  key={time.id}
                  className={`cursor-pointer p-4 rounded-lg ${
                    selectedTime === time ? "bg-green-500" : "bg-gray-100"
                  }`}
                  onClick={() => handleTimeClick(time)}
                >
                  <ul>{time}</ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Book
            </button>
          </div>
          <span
            className="absolute top-2 right-2 cursor-pointer font-bold"
            onClick={onClose}
          >
            &times;
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
