
module.exports = (app, db) => {
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.get('/students', (req, res) => {
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
                res.json(result)
            })
        });
    });

    app.post('/add', (req, res) => {
        console.log(req.body);
    });

    app.post('/delete');
    app.post('/signUp', (req, res) => {
        console.log(req.body.username.value);
        console.log(req.body.password.value);
        // db.connect(function (err) {
        //     if (err) {
        //         throw err
        //     };
        //     console.log("Connected!");
        //     let query = "INSERT INTO `user`(`username`, `password`) VALUES ([value-2],[value-3])"
        //     db.query(query, (err, result, fields) => {
        //         if (err) {
        //             throw err;
        //         }
        //         //console.log(result);
        //         res.json(result)
        //     })
        // });
    })
}