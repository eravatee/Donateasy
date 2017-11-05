var express = require('express');
var connection = require('./config');
var moment = require('moment');
var bodyParser = require('body-parser');
var notifier = require('node-notifier');
var name = require('./login')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var org3 = express();
org3.use('/login', name);
//console.log(name.id);
var router = express.Router();
    org3.set('view engine', 'ejs');
    router.get('/', function(req,res){
            
        connection.query('select * from School', function(err,rows){
           res.render("school",{data : rows,type: req.user._id});  
        })
    });

    router.post('/', urlencodedParser, function(req,res){
        var item = req.body.Item_id;
        var org = req.user._id;
        var qty = req.body.Qty;
        var date = moment().format('YYYY-MM-DD');
        quant = rows[0].Quantity - qty;
        connection.query('select Donor_id from School where Item_id = ? ',[req.body.Item_id],function(err,rows){
            if(err) throw err;
            else
            console.log('Donor id : ',rows[0].Donor_id);
            console.log('Item id : ',item);
            console.log('Organisation id : ',org);
            var donor = rows[0].Donor_id;
    
               if(quant>0)
            {
                connection.query('UPDATE School SET Quantity = ?,DQ = ? where Item_id = ?',[quant,qty,item],function(err,rows){
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
    
                connection.query('select * from School', function(err,rows){
                    res.render("School",{data : rows, type: req.user._id});  
                 });            
            });
     
    
        // 
    
    });
module.exports = router;
