var express = require('express');
var notifier = require('node-notifier');
var connection = require('./config');
var passport = require('passport');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var register = express();
const saltRounds = 10;
register.use(passport.initialize());
register.use(passport.session());

var router = express.Router();
    register.set('view engine', 'ejs');
    router.get('/', function(req,res){
         res.render('signup',{data:'0'});
    });
    router.post('/', urlencodedParser, function(req,res){
        var rec_length;
        var today = new Date();
        var length;
        var pass = req.body.Password;
        bcrypt.hash(pass, saltRounds, function(err, hash) {
        var donor={
        "Name":req.body.Name,
        "Address":req.body.Address,
        "City":req.body.City,
        "Contactno":req.body.Contactno,
        "Email":req.body.Email,
        "Password":hash,
        "Usename" :req.body.Username
        }
      console.log(req.body);
        if(req.body.Type ==='donor'){
             console.log('hello')
        connection.query('select * from Donors where Usename = ?',[donor.Usename], function(req,res1){
             rec_length = res1.length;
             console.log(res1.length);
             length = 0;

             if(rec_length!=0){
                console.log('the username exists, please use another name');
                length = 1;
               console.log(length); 
               notifier.notify('username exists');
               res.redirect('/signup');
          }
             
    });
     connection.query('INSERT INTO Donors SET ?',donor, function (error, results, fields) {
      if (error) {
             console.log('there is some error with the query');
             console.log(error);
        }
      else{
             console.log('user registered sucessfully');
      }


       connection.query('select LAST_INSERT_ID() as user_id', function(error,results,fields){
            if (error) throw error;

            const user_id = results[0];
            console.log(results[0]);
            req.login(user_id, function(error){
                res.redirect('/login');
            })
       });
    });

 }else{
     
    connection.query('select * from Organisations where Usename = ?',[donor.Usename], function(req,res){
       console.log(res.length);
       length = res.length;
    });
    if(length!=0){
        console.log(res.length);
        console.log('the username exists, please use another name');
        length =1;
        notifier.notify('username exists');
        res.redirect('/signup');
    }

    if(length == 0){
    connection.query('INSERT INTO Organisations SET ?',donor, function (error, results, fields) {
      if (error) {
            console.log('there is some error with the query');
            console.log(error);
        }
      else{
            console.log('user registered sucessfully');
      }
           connection.query('select LAST_INSERT_ID() as user_id', function(error,results,fields){
            if (error) throw error;
            const user_id = results[0];
            console.log(results[0]);
            req.login(user_id, function(error){
                res.redirect('/login');
            })
       });

    });
   }
 }
});
});

module.exports = router;
