 var express = require('express');
 var donate1= express();
 var moment = require('moment'); 
var connection = require('./config');
var multer  = require('multer')
var bodyParser = require('body-parser');
var storage = multer.diskStorage({
  destination : function(req,file,cb){
      cb(null,'public/uploads/clothes');
  },
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
}); 

var upload = multer({storage : storage}).any();
var router = express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false });

donate1.set('view engine', 'ejs');

router.get('/',function(req,res){
     if(req.user._id >=1000000 && req.user._id <2000000)
        res.render('step2_clothes');
    else{
        res.send('no access');
    }    
 
});

router.post('/',urlencodedParser,upload,function(req,res){
   console.log('hello');   
   console.log(req.body);
   console.log(req.files);
   console.log(req.files[0].path);
   console.log(req.user._id);
   var clothes={
     'Item_desc': req.body.desc,
     'Gender' : req.body.Gender,
     'Donor_id' : req.user._id,
     'Size' : req.body.Size,
     'AgeGrp': req.body.AgeGrp,
     'Image' : req.files[0].path,
     'Date' : moment().format('YYYY-MM-DD'),
     'Quantity' : req.body.Quantity
   }
   connection.query('insert into ClothesNshoes set ?',clothes,function(err,res){
     if(err){
       console.log('the query is incorrect');
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