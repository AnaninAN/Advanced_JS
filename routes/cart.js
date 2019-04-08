const express = require('express');
const routerCart = express.Router();
const Cart = require('../models/Cart');

routerCart.get('/', async (req, res) => {
    
    const cartItems = await Cart.find({});

    res.status(200).send({
        items: cartItems,
        total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    });
});
/*
routerCart.post('/', async (req, res) => {
    
});

routerCart.delete('/', async (req, res) => {
    
});
*/
module.exports = routerCart;