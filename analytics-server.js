var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://dbuser:123mudar#@ds139428.mlab.com:39428/driveondb', { useMongoClient: true });  

// Models
// var companies = require('./models/do_com_m00');
// var do_car_a00 = require('./models/do_car_a00');

// Routes
var index = require('./routes/index');
var timeline = require('./routes/timeline');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/alarms', timeline);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   res.render('error', err);
// });

app.get('/locate', function(req, res){
  res.render('locate', {
    title: 'Drive On Portal| Localizar'
  });
});

app.get('/alarmes', function(req, res){
  res.render('ealarms', {
    title: 'Drive On Portal| Alarmes'
  });
});
// error handler
app.use(function(err, req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = mongoose;
  next();
});

mongoose.connection.on('connected', () => {
  return console.log('Mongoose conectado')
})

mongoose.connection.on('disconnected', () => {
  return console.log('Mongoose desconectado')
})

mongoose.connection.on('error', error => {
  return console.log('Mongoose erro de conexão: ' + error)
})

module.exports = app;
