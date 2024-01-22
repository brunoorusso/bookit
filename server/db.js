const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const root = path.resolve(__dirname, '..');
process.chdir(root);
dotenv.config();

const MONGO_URI = process.env.URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(`Error connecting to MongoDB: ${err}`)
})