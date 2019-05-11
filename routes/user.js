const express = require('express');
const routerUser = express.Router();
const User = require('../models/User');

routerUser.post('/', async (req, res) => {
 
    if (req.body.name !== undefined) {
        await User.create(req.body);
        
        const item = await User.find({ login: req.body.login });
        
        res.status(201).send({
            id: item[0]._id,
            name: item[0].name
        });
    } else {
        
        const item = await User.findOne(req.body);
        if (item !== null) {
            res.status(200).send({
                id: item._id,
                name: item.name
            });
        } else {
            res.status(404).end('Wrong login or password!');
        }
    }
});

module.exports = routerUser;