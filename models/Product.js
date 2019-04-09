const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prodSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    src: {
        type: String,
        required: true
    }
}, 
{ collection : 'products' });

module.exports = mongoose.model('products', prodSchema);