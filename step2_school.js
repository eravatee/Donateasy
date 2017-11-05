var express = require('express');
var donate3= express();
var moment = require('moment');
var connection = require('./config');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer  = require('multer')
var storage = multer.diskStorage({
  destination : function(req,file,cb){
      cb(null,'public/uploads/school');
  },
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
}); 

var upload = multer({storage : storage}).any();
var router = express.Router()

donate3.set('view engine', 'ejs');
router.get('/',function(req,res){
     if(req.user._id >=1000000 && req.user._id <2000000)
        res.render('step2_school');
    else{
        res.send('no access');
    }    
  
});

router.post('/',urlencodedParser,upload,function(req,res){
   console.log(req.body);
   console.log(req.files[0].path);
      var school={
     'Item_desc': req.body.desc,
     'Donor_id' : req.user._id,
     'Image' : req.files[0].path,
     'Date' : moment().format('YYYY-MM-DD'),
     'Quantity' : req.body.Quantity
    }

   connection.query('insert into School set ?',school,function(err,res){
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