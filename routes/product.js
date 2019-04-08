const express = require('express');
const routerProd = express.Router();
const Product = require('../models/Product');

routerProd.get('/', async (req, res) => {
    
    const products = await Product.find({});
    res.status(200).send(products);
});

module.exports = routerProd;