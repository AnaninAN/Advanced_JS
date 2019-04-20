const express = require('express');
const routerUser = express.Router();
const User = require('../models/User');

routerUser.get('/', async (req, res) => {
    
    const cart = await Cart.find({});

    res.status(200).send({
        items: cart,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    });
});

module.exports = routerUser;