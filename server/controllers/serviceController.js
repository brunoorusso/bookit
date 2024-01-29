const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../client/public/uploads'));
    },
    filename: (req, file, cb) => {
      // Gera um nome de arquivo único
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

const upload = multer({storage});

router.get('/all', async(req, res) => {
    try{
        const services = await Service.find();
        res.json(services);
    }catch(err){
        res.status(500).json({err: 'Internal server error'});
    }
});

// Appointment por user
router.get('/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const service = await Service.find({ _id: id });
        if(!service){
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        console.error('Error finding service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})


router.post('/new', upload.single('image'), async(req, res) => {
    try{
        //Dados que vêm do form de registo, no corpo do request
        const {name, phone, description, location, availability} = req.body;
        const image = req.file;

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
                availability,
                image: image.filename
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