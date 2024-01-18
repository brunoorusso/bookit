const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    serviceId: {type: mongoose.Schema.Types.ObjectId, ref:'Service', required: true},
    time: {type: String, required: true},
    date: {type: Date, required: true}
})

module.exports = mongoose.model('Appointment', appointmentSchema);