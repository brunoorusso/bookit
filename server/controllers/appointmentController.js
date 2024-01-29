const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Todos os appointments
router.get('/all', async(req, res) => {
    try{
        const appointments = await Appointment.find();
        res.json(appointments);
    }catch(err){
        res.status(500).json({err: 'Internal server error'});
    }
});

// Appointment por user
router.get('/user/:userId', async(req, res) => {
    const {userId} = req.params;
    try{
        const appointment = await Appointment.find({ userId });
        if(!appointment){
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        console.error('Error finding appointment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

// Appointment por serviço
router.get('/:serviceId', async(req, res) => {
    const { serviceId } = req.params;

    try{
        const appointment = await Appointment.find({ serviceId });
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        console.error('Error finding appointment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post('/new', async(req, res) => {
    try{
        const {userId, serviceId, time, date} = req.body;

        const newAppointment = new Appointment({
            userId,
            serviceId,
            time,
            date
        });

        try{
            const savedAppointment = await newAppointment.save();
            res.status(201).json(savedAppointment);
        } catch(error){
            res.status(500).json({
                error: 'Error saving service to database'
            })
        }
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.delete('/delete/:appointmentId', async(req, res) => {
    try {
        const {appointmentId} = req.params;

        if(!appointmentId){
            return res.status(400).json({ error: 'Appointment ID not provided' });
        }

        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json({ message: 'Appointment deleted successfully' });
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;