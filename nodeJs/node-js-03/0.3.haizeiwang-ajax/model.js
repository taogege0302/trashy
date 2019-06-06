var mysql = require('mysql');
var conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'nodejs'
})

conn.connect();

module.exports = {
    cha: function (c) {
        conn.query('select * from users', function (err, sqlbackdata) {
            // console.log(sqlbackdata)
           c(sqlbackdata);
        })
    }
}



