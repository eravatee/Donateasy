var express = require('express');
var connection = require('./config');
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: '/home/era/Meenie_Project/images'})
var profile= express();

var router = express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false });

profile.set('view engine', 'ejs');

router.get('/',authenticationMiddleware(),function(req,res){
	res.render('/profile');  
});

function authenticationMiddleware (){  
	
	return (req, res, next) => {
	console.log(`user name : ${JSON.stringify(req.user.name)}`);
	console.log(`user id : ${JSON.stringify(req.user._id)}`);
			if (req.isAuthenticated()){
            if(req.user._id == 0){
                res.redirect('/admin');
            }else if(req.user._id >= 1000000 && req.user._id < 2000000){
                res.redirect('/donor');
            }else if(req.user._id >= 2000000 && req.user._id < 3000000){
				res.redirect('/organisations');
			}
        }
		}
	}
module.exports = router;
//donate1.listen(3000);