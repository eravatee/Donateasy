var mysql      = require('mysql');
var connection = mysql.createConnection({
    host :'eravatee',
    socketPath :'/var/run/mysqld/mysqld.sock',
    user :'root',
    password :'bluebird',
    database : 'donateasy'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;
