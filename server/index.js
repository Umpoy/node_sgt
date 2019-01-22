const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

const mysql = require('mysql');
const configDB = require('./config/database');
const db = mysql.createConnection(configDB)

app.listen(port, () => {
    console.log("Server running on localhost: " + port);
})