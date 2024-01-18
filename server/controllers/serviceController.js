const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.get('/all', async(req, res) => {
    try{
        const services = await Service.find();
        res.json(services);
    }catch(err){
        res.status(500).json({err: 'Internal server error'});
    }
});

router.post('/new', async(req, res) => {
    try{
        //Dados que vêm do form de registo, no corpo do request
        const {name, phone, description, location, availability} = req.body;

        //Verificar que o user não existe
        const duplicatedService = await Service.findOne({phone});
        if(duplicatedService){
            return res.status(400).json(({
                error: 'This service already exists'
            }))
        }

            const newService = new Service({
                name,
                phone,
                description,
                location,
                availability
            });

            try{
                const savedService = await newService.save();
                res.status(201).json(savedService);
            } catch(error){
                res.status(500).json({
                    error: 'Error saving service to database'
                })
            }
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});


module.exports = router;