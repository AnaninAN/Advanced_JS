const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    action: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection : 'log' });

module.exports = mongoose.model('log', logSchema);