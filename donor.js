var express = require('express');
var connection = require('./config');
var bodyParser = require('body-parser');
var name = require('./login')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var donor = express();
donor.use('/login', name);
//console.log(name.id);
var router = express.Router();
    donor.set('view engine', 'ejs');
router.get('/',function(req,res){
    //console.log(`2user name : ${JSON.stringify(req.user.name)}`);
	//console.log(`2user id : ${JSON.stringify(req.user._id)}`);
    var test = req.user._id;
     console.log(test);
     if(test>=1000000){  
        res.render('login-success-donor',{name:req.user.name});  
      }
      else{
          res.send('no access');
      }
    });
module.exports = router;