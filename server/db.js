const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://brunoorusso:MongoDB123@cluster0.rk15yc1.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(`Error connecting to MongoDB: ${err}`)
})