const express = require('express');
const db = require('./db');
const app = express();
const port = process.env.PORT || 3500;

app.get("/api", (req, res) => {
    res.send({message: 'Express Hey!'});
});

app.listen(port, () => console.log(`On Port ${port}`));