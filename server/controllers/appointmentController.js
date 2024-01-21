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