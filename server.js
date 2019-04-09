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
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use('/products', prodRouter);
app.use('/cart', cartRouter);

app.listen(port, () => {
    console.log(`Server has been started on port ${config.port}`);
});