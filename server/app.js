const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');
const userRouter = require('./controllers/userController');
const serviceRouter = require('./controllers/serviceController')
const appointmentRouter = require('./controllers/appointmentController');
const app = express();
const port = process.env.PORT || 3500;

app.use(cors());

app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.send({message: 'Express Hey!'});
});

app.use('/users', userRouter);
app.use('/services', serviceRouter);
app.use('/appointments', appointmentRouter);

app.listen(port, () => console.log(`On Port ${port}`));