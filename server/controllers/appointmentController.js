const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.get('/all', async(req, res) => {
    try{
        const appointments = await Appointment.find();
        res.json(appointments);
    }catch(err){
        res.status(500).json({err: 'Internal server error'});
    }
});

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

module.exports = router;