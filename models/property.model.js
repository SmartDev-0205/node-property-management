const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    name: { type: String },
    address: { type: String },
    type: { type: Number },
    description: { type: String },
    imageUrl: { type: String },
    totalRooms: { type: Number },
    occupancyType: { type: String },
    rentAmount: { type: Number },
    rentFrequency: { type: String },
    isPublished: {type: Boolean, default: false},
});


// Export the model
module.exports = mongoose.model('Property', PropertySchema);

