const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
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
    },
    quantity: {
        type: Number,
        required: true
    }
}, { collection : 'cart' });

module.exports = mongoose.model('cart', cartSchema);