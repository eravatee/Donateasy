var express = require('express');
var donate2= express();
var connection = require('./config');
var moment = require('moment');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer  = require('multer')
var storage = multer.diskStorage({
  destination : function(req,file,cb){
      cb(null,'public/uploads/furniture');
  },
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
}); 

var upload = multer({storage : storage}).any();

var router = express.Router()

donate2.set('view engine', 'ejs');
router.get('/',function(req,res){
      if(req.user._id >=1000000 && req.user._id <2000000)
        res.render('step2_furniture');
    else{
        res.send('no access');
    }    
  
});

router.post('/',urlencodedParser,upload,function(req,res){
   console.log(req.body);
   console.log(req.files[0].path);
     var furniture={
     'Item_desc': req.body.desc,
     'Type' : req.body.type,
     'Donor_id' : req.user._id,
      'Image' : req.files[0].path,
      'Date' : moment().format('YYYY-MM-DD'),
      'Quantity' : req.body.Quantity
    }

   connection.query('insert into Furniture set ?',furniture,function(err,res){
     if(err){
       console.log('the query in incorrect');
       console.log(err);
     }
     else{
       console.log('entry successful');
     }
   });

    res.redirect('/profile');

});
module.exports = router;
//donate1.listen(3000);