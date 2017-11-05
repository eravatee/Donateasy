var connection = require('./config');
var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: '/home/era/Meenie_Project/images'})
var donate= express();
var router = express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false });
donate.set('view engine', 'ejs');

router.get('/',function(req,res){
    console.log(`1user name : ${JSON.stringify(req.user.name)}`);
	console.log(`1user id : ${JSON.stringify(req.user._id)}`);
    if(req.user._id >=1000000 && req.user._id <2000000)
        res.render('step1');
    else{
        res.send('no access');
    }    
});

router.post('/', urlencodedParser,upload.any(),function(req,res){
    console.log(req.body); 
    var Category= req.body.cat;
   
    if(Category == 'Clothes/shoes'){   
        res.redirect('./step2_clothes');
    }else if(Category == 'Furniture'){
        res.redirect('./step2_furniture');
    }else if(Category == 'School supplies'){
        res.redirect('./step2_school');        
    }else if(Category == 'Toys/Sports'){
        res.redirect('./step2_sports');
    }else if(Category == 'Books/CDs'){
        res.redirect('./step2_books');
    }   
 });
 module.exports = router;
