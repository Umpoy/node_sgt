const express = require('express');
const app = express();
const cors = require('cors');
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
    db.query("SELECT * FROM customers", (err, result, fields) => {
        if (err) {
            throw err;
        }
        //console.log(result);
    })
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'string',
    saveUninitialized: true,
    resave: true
}));

require('./app/routes.js')(app);

app.listen(port, () => {
    console.log("Server started in port " + port);
});