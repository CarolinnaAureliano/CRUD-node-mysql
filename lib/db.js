var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'127.0.0.1', //or localhost
	user:'user',
	password:'user',
	database:'supermercado'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;