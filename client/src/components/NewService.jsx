import React, { useState } from "react";
import api from "../services/api";

export default function NewService() {
  const [serviceData, setServiceData] = useState({
    name: "",
    phone: "",
    description: "",
    location: "",
    availability: [],
  });

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(30);

  const calculateAvailability = (start, end, duration) => {
    const availability = [];
    
    const startTime = new Date(`2022-01-01T${start}`);
    const endTime = new Date(`2022-01-01T${end}`);

    // Loop para calcular os intervalos
    while (startTime < endTime) {
        const formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        availability.push(formattedTime);
        startTime.setMinutes(startTime.getMinutes() + duration);
    }

    return availability;
    
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;

    if(name in serviceData){
        setServiceData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }else{
        switch (name) {
            case "startTime":
              setStartTime(value);
              break;
            case "endTime":
              setEndTime(value);
              break;
            case "duration":
              setDuration(value);
              break;
            default:
              break;
          }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const calculatedAvailability = calculateAvailability(
      startTime,
      endTime,
      duration
    );

    setServiceData((prevData) => ({
        ...prevData,
        availability: calculatedAvailability,
      }), () => {
        // O código a seguir será executado após o estado ser atualizado
        console.log(`Start Time : ${startTime} | End Time : ${endTime}`);
        console.log(serviceData);
      });

    console.log(`Start Time : ${startTime} | End Time : ${endTime}`)
    console.log(serviceData);
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className="bg-white border border-gray-300 p-8 rounded-lg shadow-md mt-10 ml-20 mr-20">
        <form className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={serviceData.name}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                value={serviceData.phone}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Location
            </label>
            <div className="mt-2">
              <input
                id="location"
                name="location"
                value={serviceData.location}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Service Duration (minutes)
            </label>
            <div className="mt-2">
              <input
                id="duration"
                name="duration"
                type="number"
                min="30"
                max="60"
                value={duration}
                onChange={handleInputChange}
                step="30"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="startTime"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Opening hours
            </label>
            <div className="mt-2">
              <input
                id="startTime"
                name="startTime"
                type="time"
                value={startTime}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="endTime"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Closing hours
            </label>
            <div className="mt-2">
              <input
                id="endTime"
                name="endTime"
                type="time"
                value={endTime}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                value={serviceData.description}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
          <div className="col-span-2 mt-10">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
