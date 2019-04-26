const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    passwd: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true   
    },
    email: {
        type: String,
        required: true   
    }
}, { collection : 'users' });

module.exports = mongoose.model('users', userSchema);