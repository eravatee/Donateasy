var express = require('express');
var connection = require('./config');
var bodyParser = require('body-parser');
var name = require('./login')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var org = express();
org.use('/login', name);
//console.log(name.id);
var router = express.Router();
    org.set('view engine', 'ejs');
router.get('/',function(req,res){
    var test = req.user._id;
     console.log(test);
     if(test>=2000000){  
        res.render('login-success-org',{name:req.user.name});  
      }
      else{
          res.send('no access');
      }
    });
module.exports = router;