﻿import express = require('express');
import routes = require('./routes');
import path = require('path');
import server_ajax = require('./scripts/server/server-ajax');
import net = require('net');
import dbUser = require('./scripts/server/user');
import passport = require('passport')
import multer = require('multer');
import user = require('./scripts/server/user');
var session: any = require('express-session')
var local: any = require('passport-local');
var LocalStrategy = local.Strategy;
var morgan : any = require('morgan');
var bodyParser : any = require('body-parser');
var app : any = express(); 
import stylus = require('stylus');
var errorhandler : any = require('errorhandler');
var expressWinston : any = require('express-winston');
var winston : any = require('winston'); // for transports.Console
 
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('env', 'development');
app.use(morgan('tiny'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({resave: true, saveUninitialized: true, secret: 'keyboard cat'}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
    function(username, password, done) {
        dbUser.auth({ username: username, password: password })
        .then((res) => {
            if (!res.ok) done(null, false, { message: res.why});
            done(null, res.result);
        })
        .catch((err) => {
            done(err);
        });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  dbUser.get({user: {username: username}})
  .then((res) => {
    done(null, res);
  })
  .catch((e) => {
    done(e, null);
  })
});

var done = false;
var last_image = '';
var multerHandler = multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
  return filename+Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    last_image = file.path;
    done=true;
  },
  onParseEnd: function(req, next) {
    user.uploadAvatar({user: req.user, image: {path: last_image}})
    next();
  }
});
app.use(function(req, res, next) {
  if (!req.isAuthenticated())
    return next();
  multerHandler(req, res, next);
});
// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
}
app.get('*', function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});
app.post('/api/auth', 
  passport.authenticate('local', {  }),
  function(req, res) {
    res.redirect('/');
  }
);
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
app.post('/api/photo',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
});
routes.set(app);

var ajaxList = server_ajax.getServerAjaxList();
ajaxList.forEach(ajax => ajax.setExpressAjax(app));
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
