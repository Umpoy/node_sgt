const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', () => {
    console.log('hello')
})

app.listen(port, () => {
    console.log("Port running on localhost:" + port)
});