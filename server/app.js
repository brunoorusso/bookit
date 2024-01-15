const express = require('express');
const db = require('./db');
const userRouter = require('./controllers/userController');
const serviceRouter = require('./controllers/serviceController')
const app = express();
const port = process.env.PORT || 3500;

app.get("/api", (req, res) => {
    res.send({message: 'Express Hey!'});
});

app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);

app.listen(port, () => console.log(`On Port ${port}`));