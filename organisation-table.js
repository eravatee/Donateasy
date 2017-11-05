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
        connection.query('select * from BooksnCDs', function(err,rows){
            //console.log(rows.body);
        res.render("BooksnCDs",{data : rows});  
        })
    });
module.exports = router;
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
        if(req.user._id == 0 )
        {connection.query('select * from Organisations', function(err,rows){
            //console.log(rows.body);
        res.render("organisation",{data : rows});  
    })
        }else{
            res.send('no access');
        }
    });
module.exports = router;
