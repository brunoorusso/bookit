import React, { useState, useEffect } from "react";
import AppointmentCard from './AppointmentCard'
import api from "../services/api";

export default function MyAppointments(props) {
  const [appointmentData, setAppointmentData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.get(`/appointments/user/${props.currentUser.userId}`);
            const appointments = response.data;
            setAppointmentData(response.data);
            

            const appointmentDetails = await Promise.all(
                appointments.map(async (appointment) => {
                    console.log(`ID: ${appointment.serviceId}`)
                    const serviceResponse = await api.get(`/services/${appointment.serviceId}`);
                    const data = serviceResponse.data;
                    return {...appointment, data};
                })
            );
            
            setServiceData(appointmentDetails);

        } catch (error) {
            console.error("Erro ao ir buscar os dados");
          }
        };
        fetchData();
    }, [])

    console.log(serviceData)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
    {serviceData.map((appointment, index) => (
        <div key={index}>
            {appointment.data.map((dataObj, dataIndex) => (
                <AppointmentCard key={dataIndex} 
                name={dataObj.name} 
                phone={dataObj.phone} 
                location={dataObj.location}
                date={appointment.date}
                time={appointment.time}
                />
            ))}
        </div>
        
    ))}
    
    </div>
  );
}
