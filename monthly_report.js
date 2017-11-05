var express = require('express');
var path = require('path');
var moment = require('moment');
var connection = require('./config');
var bodyParser = require('body-parser');
var name = require('./login')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var report = express();
var router = express.Router();
    report.set('view engine', 'ejs');
    router.get('/', function(req,res){
        var day = moment().format('MM');  
        connection.query('SELECT `Donor_id`,`Item_id`, `Item_desc`,Date,DQ FROM ClothesNshoes WHERE month(Date)= ?;',[day], function(err,rows1){
            connection.query('select Donor_id,Item_id,Item_desc,Date,DQ from BooksnCDs where month(Date)= ?',[day], function(err,rows2){             
                connection.query('select Donor_id,Item_id,Item_desc,DQ Date from Furniture where month(Date)= ?',[day], function(err,rows3){
                    connection.query('select Donor_id,Item_id,Item_desc,Date,DQ from School where month(Date)= ?',[day], function(err,rows4){
                        connection.query('select Donor_id,Item_id,Item_desc,Date,DQ from Sports where month(Date)= ?',[day], function(err,rows5){
                            res.render("report",{day1 : rows1, day2 : rows2, day3 : rows3, day4 : rows4, day5 : rows5,name:'Monthly'});  
                         });  
                     });
                 });
             });     
        });
    });
module.exports = router;