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
        // const username = req.body.username.value;
        const username = req.body.username.value;
        const password = req.body.password.value;
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(9))
        console.log(req.body.username.value);
        console.log(hashPassword);
        console.log(typeof username);
        db.connect(function (err) {
            if (err) {
                throw err
            };
            console.log("Connected!");
            let sql = "SELECT `username` FROM `user` WHERE `username`  = " + "'" + username + "'";
            db.query(sql, function (err, result, fields) {
                if (err) {
                    throw err
                };
                if (result.length > 0) { //username is taken
                    console.log("username is already taken")
                } else { //username is valid
                    sql = "INSERT INTO `user`(`username`, `password`) VALUES ('" + username + "','" + hashPassword + "')"
                    db.query(sql, (err, result) => {
                        if (err) {
                            throw err;
                        }
                        console.log("Saved to DB");
                        res.send('hello')
                    })
                }
            });

        });
    })
}