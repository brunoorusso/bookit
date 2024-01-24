import React from "react";

export default function AppointmentCard(props){

    return(
        <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-2">{props.name}</h2>
        <p className="text-gray-600">Location: {props.location}</p>
        <p className="text-gray-600">{props.phone}</p>
        <p className="text-sm text-gray-400 mt-2">Date: {props.date}</p>
        <p className="text-sm text-gray-400 mt-2">Time: {props.time}</p>
        <button>Cancel</button>
      </div>
    )
}