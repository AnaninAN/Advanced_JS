const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 3000;
const app = express();

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
        
        res.send(data);
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
            res.send(req.body);
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
            res.send(cart.find((item) => +item.id === +req.params.id));
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
            res.send(cart.find((item) => +item.id === +req.params.id));
        });
    });
});



app.listen(port, () => {
    console.log('Server has been started');
});