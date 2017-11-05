var express = require('express');
var connection = require('./config');
var bodyParser = require('body-parser');
var name = require('./login')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var contact = express();
contact.use('/login', name);
//console.log(name.id);
var router = express.Router();
    contact.set('view engine', 'ejs');
router.get('/',function(req,res){
        res.render('contacts');
    });

    
module.exports = router;