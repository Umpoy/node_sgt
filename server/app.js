const express = require('express');
const app = express();
const port = 5000;

const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');



app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'string',
    saveUninitialized: true,
    resave: true
}));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port);