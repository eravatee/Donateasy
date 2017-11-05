var express = require('express');
var connection = require('./config');
var moment = require('moment');
var bodyParser = require('body-parser');
var notifier = require('node-notifier');
var name = require('./login')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var org1 = express();

org1.use(function(req,res,next){
    res.locals.val = req.query.i;
});
org1.use('/login', name);
var i;
var router = express.Router();
    org1.set('view engine', 'ejs');
   
router.get('/', function(req,res){
    // console.log(req.query.i);
    connection.query('select * from BooksnCDs', function(err,rows){
        res.render("BooksnCDs",{data : rows, type: req.user._id}); 

    });
}); 
router.post('/', urlencodedParser, function(req,res){
    var item = req.body.Item_id;
    var org = req.user._id;
    var qty = req.body.Qty;
    var date = moment().format('YYYY-MM-DD');
    connection.query('select Donor_id,Quantity from BooksnCDs where Item_id = ? ',[req.body.Item_id],function(err,rows){
        if(err) throw err;
        else
        console.log('Donor id : ',rows[0].Donor_id);
        console.log('Item id : ',item);
        console.log('Organisation id : ',org);
        var donor = rows[0].Donor_id;
        quant = rows[0].Quantity - qty;
        if(quant>0)
        {
            connection.query('UPDATE BooksnCDs SET Quantity = ?,DQ = ? where Item_id = ?',[quant,qty,item],function(err,rows){
            if(err) throw err;
            else
                console.log('quantity updated');
            });
            connection.query('call donation(?,?,?,?,?)',[donor,org,item,date,quant], function(err,rows){
                if(err) throw err;
                else{
                    console.log('insert successful');
                }
            });
    
        }
        if(quant==0)
        {
            connection.query('call deleting(?)',[item],function(err,rows){
                    if(err) throw err;
                    else{
                        console.log('delete successful');
                        console.log(rows);
                        }
                    });
        }
        else if(quant<0)
        {
            notifier.notify('Entered quantity is greater than present quantity');
        }

            connection.query('select * from BooksnCDs', function(err,rows){
                res.render("BooksnCDs",{data : rows, type: req.user._id});  
             });            
    });
 

    // 

});


module.exports = router;