var express = require('express');
var connection = require('./config');
var bodyParser = require('body-parser');
// var multer  = require('multer')
// var upload = multer({ dest: '/home/era/Meenie_Project/images'})
var drop= express();

var router = express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false });

drop.set('view engine', 'ejs');

router.get('/',function(req,res){
    var i = req.query.i;
    console.log(i);
    if(i>=0){
    if(req.user._id > 0){    
    connection.query('select * from Books', function(err,rows){
    console.log('item id: ',rows[i].Item_id);
    var item = rows[i].Item_id;
    console.log('donor id: ',rows[i].Donor_id);
    var donor = rows[i].Donor_id;
    console.log('org id: ',req.user._id);
    var org = req.user._id;
    connection.query('call donated(?,?,?)',[donor,org,item],function(err,rows){
        console.log('donor: ',donor);
        console.log('org: ',org);
        console.log('item: ',item);
    if(err) throw err;
    else{
        console.log('action successful');
        console.log(rows);
        res.redirect('/organisations');
     }
    });
   }); 
    }else if(req.user._id ==0){
        connection.query('call del(?)',[item],function(err,rows){
        if(err) throw err;
        else{
            console.log('action successful');
            console.log(rows);
            res.redirect('/admin');
            }
        });

    }
     }
      if(req.user._id ==0 )
    res.render('drop');
    else{
   //     res.send('no access');
    }
});

// router.post('/',urlencodedParser, function(req,res){
//     console.log(req.body);
//     var donor =req.body.donor;
//     console.log('donor: ',donor);
//     var item = req.body.item;
//     console.log('item: ',item);
//     var org = req.body.org;
//      console.log('org: ',org);
//     connection.query('call donated(?,?,?)',[donor,org,item],function(err,rows){
//         if(err) throw err;
//         else{
//             console.log('action successful');
//             console.log(rows);
//             connection.query('call del(?)',[item],function(err,rows){
//         if(err) throw err;
//         else{
//             console.log('action successful');
//             console.log(rows);
//             res.redirect('/admin');
//          }

//     });

//          }
//     });
// });

module.exports = router;