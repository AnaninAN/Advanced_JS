const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/', async (req, res) => {
    
    const cart = await Cart.find({});
    res.status(200).json(cart);
});

router.post('/', async (req, res) => {
    
    const cartData = {
        title: req.body.title,
        price: req.body.price,
        src: req.body.src,
        quantity: req.body.quantity
    };
    
    const cart = new Cart(cartData);
    await cart.save();
    
    res.status(201).json(cart);
});

router.delete('/', async (req, res) => {
    
});

module.exports = router