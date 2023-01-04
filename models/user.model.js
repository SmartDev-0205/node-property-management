const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    isAdmin: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
});

// Export the model
module.exports = mongoose.model('User', UserSchema);

