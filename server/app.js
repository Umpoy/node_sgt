const express = require('express');
const app = express();
const port = 5000;

const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port);