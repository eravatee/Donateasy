var express = require('express');
var logout = express();
var router = express.Router();
var connection = require('./config');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

logout.set('view engine', 'ejs');

router.get('/', function(req,res){ 
   console.log(req.session.userid); 
   req.session.destroy();
   res.redirect('/');
});

module.exports = router;