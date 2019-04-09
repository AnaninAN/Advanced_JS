const express = require('express');
const routerCart = express.Router();
const Cart = require('../models/Cart');
const Log = require('../models/Log');

const writeLog = (action, product) => {
    const logData = { action, product };

    Log.create(logData);
};

routerCart.get('/', async (req, res) => {
    
    const cart = await Cart.find({});

    res.status(200).send({
        items: cart,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    });
});

routerCart.post('/', async (req, res) => {
    
    const cartData = {
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        src: req.body.src,
        quantity: req.body.quantity
    };
    
    writeLog('Add', req.body.title);
    
    const cartItem = await Cart.create(cartData);
    const cart = await Cart.find({});
    
    res.status(201).send({
        item: cartItem,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    });
});

routerCart.patch('/:id', async (req, res) => {
    
    await Cart.findOneAndUpdate({id: req.params.id}, req.body, {new: true}, async function(err, item) {
        
        const cart = await Cart.find({});
        res.status(200).send({
            item: item,
            total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        }); 
    });
});

routerCart.delete('/:id', async (req, res) => {
    
    await Cart.remove({id: req.params.id});
    
    const cart = await Cart.find({});

    res.status(200).send({
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    });
});

module.exports = routerCart;