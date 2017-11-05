var express = require('express');
var connection = require('./config');
var bodyParser = require('body-parser');
var moment = require('moment');
var notifier = require('node-notifier');
var name = require('./login')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var org4 = express();
org4.use('/login', name);
//console.log(name.id);
var router = express.Router();
    org4.set('view engine', 'ejs');
    router.get('/', function(req,res){
            
        connection.query('select * from Sports', function(err,rows){
           res.render("sports",{data : rows, type: req.user._id});  
        })
    });

    router.post('/', urlencodedParser, function(req,res){
        var item = req.body.Item_id;
        var org = req.user._id;
        var qty = req.body.Qty;
        var date = moment().format('YYYY-MM-DD');
        quant = rows[0].Quantity - qty;
        connection.query('select Donor_id from Sports where Item_id = ? ',[req.body.Item_id],function(err,rows){
            if(err) throw err;
            else
            console.log('Donor id : ',rows[0].Donor_id);
            console.log('Item id : ',item);
            console.log('Organisation id : ',org);
            var donor = rows[0].Donor_id;
    
            if(quant>0)
            {
                connection.query('UPDATE Sports SET Quantity = ?, DQ = ? where Item_id = ?',[quant,qty,item],function(err,rows){
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
    
                connection.query('select * from Sports', function(err,rows){
                    res.render("Sports",{data : rows, type: req.user._id});  
                 });            
            });
     
    
        // 
    
    });
module.exports = router;
