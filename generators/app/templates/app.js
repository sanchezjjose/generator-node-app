var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var handlebars   = require('express-handlebars');
var app = express();

var homepage = require('./routes/home');
var login = require('./routes/login');
var logout = require('./routes/logout');

var hbs = handlebars.create({
    extname: 'html',
    defaultLayout: 'layout.html',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: [{
        dir: path.join(__dirname, 'views')
    }],
    helpers : {

        // TODO: move this to separate middleware
        'json': function(context) {
            return JSON.stringify(context);
        }
    }
});

app.engine('html', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// TODO: Currently not using session but setting this up in case we need it later
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true
}));

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/js', express.static('node_modules/bootstrap/dist/js'));
app.use('/lib', express.static('lib/'));
app.use('/dist', express.static('dist/'));

app.use(function(req, res, next) {
    res.locals.isLoggedIn = !!req.cookies.Authorized;
	res.locals.Hello = 'Hello';
	next();
});

app.use('/', homepage);
app.use('/login', login);
app.use('/logout', logout);
app.get('/healthcheck', function (req, res, next) {
    res.send('healthy');
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
