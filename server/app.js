const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const port = 5000;

const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');

const configDB = require('./config/database');
const db = mysql.createConnection(configDB);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'string',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, db);

app.listen(port, () => {
    console.log("Server started in port " + port);
});