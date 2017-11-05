var express = require('express');
var path = require('path');
var connection=require('./config');
var bodyParser = require('body-parser');
var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var logout = require('./logout')
var login = express();
login.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Auth = passport.authenticate('local',{successRedirect : '/profile', failureRedirect:'/login'});
var router = express.Router();
var id;
var type;
//login.listen(3000);
login.use('/logout',logout)

passport.use('local',new LocalStrategy(
  function(username, password,done){
    if(username == 'admin' && password == 'admin')
    {
        done(null,{_id : 0 , name: username});
    }else{
        
        connection.query('SELECT * from Donors where Usename = ?',[username],function(error,res,fields){
            if(error){
                done(error)
            };
            if(res.length === 0){
                connection.query('SELECT * from Organisations where Usename = ?',[username],function(error,res,fields){
                if(error){
                    done(error)
                };
                if(res.length === 0){
                    done(null,false);
                }else{
                    var hash = res[0].Password;
                    var uid = res[0].Org_id;
                    bcrypt.compare(password,hash,function(err,res){
                        if(res == true){
                            return done(null,{_id : uid , name: username});
                        }else{  
                            return done(null,false); 
                        }       
                    });
                }
            });
        }else{
                var hash = res[0].Password;
                var uid = res[0].Donor_id;
                bcrypt.compare(password,hash,function(err,res){
                 if(res == true){
                    return done(null,{_id : uid , name: username});
                }else{  
                    return done(null,false); 
                }       
                });
                }
    });
  }
}
));

router.get('/', function(req,res){
 res.render('login');
// var sess = req.session;
});

router.post('/',urlencodedParser,Auth,function(req,res){
    console.log(req.body); 
});

passport.serializeUser(function(user, done) {
  var user={_id : user._id, name : user.name};
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
module.exports = router;

