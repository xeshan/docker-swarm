var express = require('express');
var dotenv = require('dotenv');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
dotenv.config({ path: './.env' });
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpass,
    database: process.env.db,
});
// connect to database
dbConn.connect();
// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
// Retrieve user with id 
app.get('/user/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });
});
// Add a new user  
app.post('/register', function (req, res) {
    var firstname = req.body.firstname;
    var lastname= req.body.lastname;
    var email=req.body.email;
    var phonenumber=req.body.phonenumber;
    dbConn.query(`INSERT INTO users (firstname, lastname, email, phonenumber) VALUES ('${firstname}', '${lastname}', '${email}', '${phonenumber}') `, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});
// set port
app.listen(3000, function () {
    console.log('Node app is running on port '+ process.env.port);
});
module.exports = app;
