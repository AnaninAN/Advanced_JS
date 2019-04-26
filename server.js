const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const prodRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');
const port = process.env.PORT || config.port;

mongoose.connect(config.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

const app = express();
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use('/products', prodRouter);
app.use('/cart', cartRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server has been started on port ${config.port}`);
});