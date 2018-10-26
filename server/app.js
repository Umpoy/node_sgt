const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 5000;

const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const configDB = require('./config/database');
const db = mysql.createConnection(configDB);

db.connect(function (err) {
    if (err) {
        throw err
    };
    console.log("Connected!");
});


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