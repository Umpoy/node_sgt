
module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.post('/test', (req, res) => {
        console.log(req.body);
    })
}