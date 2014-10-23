﻿var express = require('express');
var routes = require('./routes/index');
var user = require('./routes/user');
var path = require('path');
var server_ajax = require('./scripts/server/server-ajax');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var stylus = require('stylus');
var errorhandler = require('errorhandler');
var expressWinston = require('express-winston');
var winston = require('winston');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(errorhandler());
    app.get('/test', routes.test);
}

app.get('/', routes.index);
app.get('/browse', routes.browse);
app.get('/articles/:id', routes.article);
app.get('/create_article', routes.create_article);
app.get('/edit_article', routes.edit_article);
app.get('/login', routes.login);
app.get('/register', routes.register);
app.get('/register_finished', routes.register_finished);
app.get('/users', user.list);

var ajaxList = server_ajax.getServerAjaxList();
ajaxList.forEach(function (ajax) {
    return ajax.setExpressAjax(app);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
return;

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
//# sourceMappingURL=app.js.map
