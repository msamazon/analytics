// var express         = require('express');
// var path            = require('path');
// var favicon         = require('serve-favicon');
// var logger          = require('morgan');
// var cookieParser    = require('cookie-parser');
// var bodyParser      = require('body-parser');
// var mongoose        = require('mongoose');
// var config          = require('./lib/config');
// var routes          = require('./routes/api.js')
// var app             = express()


// // Models
// //  var companies = require('./models/do_car_alarmsperday');
// // var do_car_a00 = require('./models/do_car_a00');

// // Routes
// app.use('/api', routes)


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// var port = process.env.PORT || 3000

// app.listen(port, function () {
//   console.log('Analytics-API listening on port ' + port)
// })

// app.use(function(err, req, res, next) {

//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// // Make our db accessible to our router
// app.use(function(req,res,next){
//   req.db = mongoose;
//   next();
// });

// // mongoose instance connection url connection

// mongoose.Promise = global.Promise;
// mongoose.connect(config.database, { useMongoClient: true });  

// mongoose.connection.on('connected', () => {
//   return console.log('Mongoose conectado')
// })

// mongoose.connection.on('disconnected', () => {
//   return console.log('Mongoose desconectado')
// })

// mongoose.connection.on('error', error => {
//   return console.log('Mongoose erro de conexão: ' + error)
// })

// module.exports = app;

var express         = require('express')
var app             = express()
var bodyParser      = require('body-parser')
var mongoose        = require('mongoose')
var passport        = require('passport')
var jwt             = require('jsonwebtoken')
var config          = require('./lib/config')
var routes          = require('./routes/api.js')
var path            = require('path')

var port = process.env.PORT || 3000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//mongo
mongoose.Promise = global.Promise
mongoose.connect(config.database, { useMongoClient: true })

mongoose.connection.on('connected', () => {
    return console.log('Mongoose conectado')
})

mongoose.connection.on('disconnected', () => {
    return console.log('Mongoose desconectado')
})

mongoose.connection.on('error', error => {
    return console.log('Mongoose erro de conexão: ' + error)
})

//----


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.use('/api', routes)

app.listen(port, function () {
    console.log('Analytics-API listening on port ' + port)
})

// app.get('/', function(req, res) {
//     res.render('index',)
// })