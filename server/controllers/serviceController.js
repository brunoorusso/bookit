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

module.exports = router;