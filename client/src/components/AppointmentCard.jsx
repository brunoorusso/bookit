import React from "react";

export default function AppointmentCard(props) {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">{props.name}</h2>
      <p className="text-gray-600">Location: {props.location}</p>
      <p className="text-gray-600">{props.phone}</p>
      <p className="text-sm text-gray-400 mt-2">Date: {props.date}</p>
      <p className="text-sm text-gray-400 mt-2">Time: {props.time}</p>
      <button
        onClick={() => props.deleteAppointment(props.id)}
        className="justify-center rounded-md mt-5 bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Cancel
      </button>
    </div>
  );
}
