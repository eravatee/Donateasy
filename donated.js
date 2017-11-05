var express = require('express');
var connection = require('./config');
var bodyParser = require('body-parser');
var name = require('./login')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var org1 = express();
org1.use('/login', name);
//console.log(name.id);
var router = express.Router();
    org1.set('view engine', 'ejs');
    router.get('/', function(req,res){
        console.log('hello');
        var i=req.query.i;
        console.log(`${i}`);
        if(req.user._id == 0){
        connection.query('select * from Donated', function(err,rows){
            //console.log(rows.body);
        res.render("donated",{data : rows});  
    })
        }else{
            res.send('no access');
        }
    });

    router.post('/',urlencodedParser,function(req,res){
        console.log(req.body);
    });
module.exports = router;
