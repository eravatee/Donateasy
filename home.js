var express= require('express');
var path = require('path');
var multer  = require('multer')
var moment = require('moment');
var connection = require('./config');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
var notifier = require('node-notifier');

var register = require('./signup');
var step1 = require('./step1');
var auth = require('./login');
var org = require('./organisations');
var org1 = require('./BooksnCDs');
var org2 = require('./ClothesNshoes');
var org3 = require('./School');
var org4 = require('./Sports');
var org5 = require('./Furniture');
var profile = require('./profile');
var logout = require('./logout');
var donor = require('./donor');
var step2_clothes = require('./step2_clothes');
var step2_furniture = require('./step2_furniture');
var step2_school = require('./step2_school');
var step2_sports = require('./step2_sports');
var step2_books = require('./step2_books');
var admin = require('./admin');
var donors = require('./donor-table');
var organisation = require('./organisation-table');
var donated = require('./donated');
var contacts = require('./contacts');
var daily_report = require('./daily_report');
var monthly_report = require('./monthly_report');
var yearly_report = require('./yearly_report');
var home = express();

home.set('view engine', 'ejs');
home.use(express.static(path.join(__dirname + '/public')));
home.use(express.static(path.join(__dirname)));
home.use(cookieParser());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var type;
var options ={
    host :'eravatee',
    socketPath :'/var/run/mysqld/mysqld.sock',
    user :'root',
    password :'bluebird',
    database : 'donateasy'
};
var sessionStore = new MySQLStore(options);

home.use(session({
    secret : 'ghghrjtrt76557j',
    resave : false,
    saveUninitialized: false,
    store : sessionStore
    //cookie: {secure : true}
}));

home.use(passport.initialize());
home.use(passport.session());

home.use(function(req,res,next){
    res.locals.isAuthenticated = req.isAuthenticated();
    if(req.isAuthenticated())
        res.locals.id=req.user._id; 
    next();
});

var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'public/uploads/');
    },
    filename: function(req,file,cb){
      cb(null,Date.now()+req.user._id+file.originalname);
    }
  }); 
var upload = multer({storage : storage}).single('picture');
//home.use(expressValidator([options]));
home.use('/signup', register);
home.use('/step1',step1);
home.use('/login', auth);
home.use('/organisations',org);
home.use('/BooksnCDs',org1);
home.use('/ClothesNshoes',org2);
home.use('/School',org3);
home.use('/Sports',org4);
home.use('/Furniture',org5);

home.use('/profile',profile);
home.use('/donor',donor);
home.use('/logout', logout);
home.use('/step2_clothes',step2_clothes);
home.use('/step2_furniture',step2_furniture);
home.use('/step2_school',step2_school);
home.use('/step2_sports',step2_sports);
home.use('/step2_books',step2_books);
home.use('/admin',admin);
home.use('/donors',donors);
home.use('/organisation',organisation);
home.use('/donated',donated);
home.use('/contacts',contacts);
home.use('/daily_report',daily_report);
home.use('/monthly_report',monthly_report);
home.use('/yearly_report',yearly_report);


home.get('/', function(req,res){
res.render('home');

// var date = moment().format('DD');
// console.log(date);
});

home.listen(4000);



