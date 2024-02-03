const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    image: {type: String, required: true},
    availability:{type: [String]},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = mongoose.model('Service', serviceSchema);