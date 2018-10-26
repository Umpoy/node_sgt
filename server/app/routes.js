const bcrypt = require('bcryptjs');
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
        // password => bcrypt.hashSync(password, bcrypt.genSaltSync(9));
        const username = req.body.username.value;
        const password = req.body.password.value;
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(9))
        console.log(req.body.username.value);
        console.log(hashPassword);
        db.connect(function (err) {
            if (err) {
                throw err
            };
            console.log("Connected!");
            // if()
            // const sql = "INSERT INTO `user`(`username`, `password`) VALUES ('" + username + "','" + hashPassword + "')"
            // db.query(sql, (err, result) => {
            //     if (err) {
            //         throw err;
            //     }
            //     console.log("Saved to DB");
            // })
        });
    })
}