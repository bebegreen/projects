var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gggg',
    database: 'battle_ship_users'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

function authenticate(username) {
    return new Promise((resolve , reject) => {
        connection.query(`select * from users where username = ${username}`, (err, result) => {
            if (err) reject(err); 
            resolve(result); 
        })
    })
}

function insertUser(username) { 
    return new Promise((resolve, reject) => { 
        connection.query(`insert into users values(null, '${username}', '1234')`, (err, result) => {
            if (err) reject(err); 
            resolve(result); 
        })
    })
}

module.exports = { 
    authenticate,
    insertUser 
}