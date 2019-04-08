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

routerCart.post('/', async (req, res) => {
    
    const cartData = {
        title: req.body.title,
        price: req.body.price,
        src: req.body.src,
        quantity: req.body.quantity
    };
    
    const cartItem = new Cart(cartData);
    await cartItem.save();
    
    res.status(201).json(cartItem);
});

routerCart.delete('/:id', async (req, res) => {
    
    const cartItems = await Cart.remove({_id: req.params.id});
    res.status(200).json({
        total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    });
});

module.exports = routerCart;