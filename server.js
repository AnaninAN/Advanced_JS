const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const fs = require('fs');
const prodRouter = require('./routes/product');
const cartRouter = require('./routes/cart');

mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

const port = process.env.PORT || config.port;

const app = express();

app.use('/products', prodRouter);
//app.use('/cart', cartRouter);
app.use(express.static('./public'));
app.use(bodyParser.json());


app.get('/products', (req, res) => {
    fs.readFile('./db/products.json', 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            res.send('Произошла ошибка');
        }
        
        res.send(data);
    });
});

app.get('/cart', (req, res) => {
    fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            res.send('Произошла ошибка');
        }
        
        const cart = JSON.parse(data);
        res.send({
            items: cart,
            total: cart.reduce((sum, item) => sum + item.price*item.quantity, 0),
        });
    });
});

app.post('/cart', (req, res) => {
    fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            res.send('Произошла ошибка');
        }
        
        const cart = JSON.parse(data);
        cart.push(req.body);
        
        fs.writeFile('./db/cart.json', JSON.stringify(cart), () => {
            res.send({
                item: req.body,
                total: cart.reduce((sum, item) => sum + item.price*item.quantity, 0),
            });
        });
    });
});

app.patch('/cart/:id', (req, res) => {
    fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            res.send('Произошла ошибка');
        }
        
        let cart = JSON.parse(data);
        cart = cart.map((item) => {
            if(+item.id === +req.params.id) {
                return {...item, ...req.body};
            }
            return item;
        });
        
        fs.writeFile('./db/cart.json', JSON.stringify(cart), () => {
            res.send({
                item: cart.find((item) => +item.id === +req.params.id),
                total: cart.reduce((sum, item) => sum + item.price*item.quantity, 0), 
            });
        });
    });
});

app.delete('/cart/:id', (req, res) => {
    fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            res.send('Произошла ошибка');
        }
        
        const cart = JSON.parse(data);
        const itemIdx = cart.findIndex((item) => +item.id === +req.params.id);
        cart.splice(itemIdx, 1);
    
        fs.writeFile('./db/cart.json', JSON.stringify(cart), () => {
            res.send({
                total: cart.reduce((sum, item) => sum + item.price*item.quantity, 0), 
            });
        });
    });
});



app.listen(port, () => {
    console.log(`Server has been started on port ${config.port}`);
});