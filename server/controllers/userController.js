const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/all', async(req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({err: 'Internal server error'});
    }
});

router.post('/register', async(req, res) => {
    try{
        //Dados que vêm do form de registo, no corpo do request
        const {name, email, phone, password} = req.body;

        //Verificar que o user não existe
        const duplicatedUser = await User.findOne({email});
        if(duplicatedUser){
            return res.status(400).json(({
                error: 'E-mail already in use'
            }))
        }

        //Criar novo user
        const newUser = new User({name, email, phone, password});
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;
        const loginUser = await User.findOne({email});

        if(!loginUser){
            return res.status(404).json({error: 'User not found'});
        }

        const passwordMatch = await bcrypt.compare(password, loginUser.password);
        if(passwordMatch){
            console.log("Logged in");
            res.status(200).json(loginUser);
        }else{
            res.status(401).json({error: 'Incorrect password'});
        }
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }  
})

module.exports = router;