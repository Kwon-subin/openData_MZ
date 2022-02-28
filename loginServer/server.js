var mysql      = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : '125.185.173.147',
  user     : 'root',
  password : '',
  database : 'openData_MZ'
});
  
connection.connect();

app.post('/login', function(req, res, next){
    connection.query("SELECT * FROM user WHERE id='" + req.body.id + "'", function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        if(results.length != 0 && req.body.pwd == results[0].password){
            res.json({'result': true});
        }
        else res.json({'result': false});
    });
})

app.listen(42105, function(){
    console.log("server started");
})