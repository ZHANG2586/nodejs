var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var index = require('./routes/index');
var users = require('./routes/users');
var news = require('./routes/news');

const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/confusion'
const connect = mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true})

connect.then(db => {
  console.log('Connect correct to server')
}, err => {console.log(err)})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(session({
  name: 'session-id',
  secret: '12345-67890',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))

app.use('/', index);
app.use('/users', users);

let authFn = (req, res, next) => {
  console.log(req.session)
  if (req.session.auth) {
    next()
  } else {
    var err = new Error('You are not authenticated!')
    err.status = 403
    next(err)
  }
}

app.use(authFn)
app.use('/news', news)

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
