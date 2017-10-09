//Modules
var express         = require('express')
var app             = express()
var bodyParser      = require('body-parser')
var mongoose        = require('mongoose')
var passport        = require('passport')
var jwt             = require('jsonwebtoken')
var config          = require('./lib/config')
var routes          = require('./routes/api.js')
var path            = require('path')
var flash           = require('req-flash')
var cookieParser    = require('cookie-parser')
var session         = require('express-session')
var localpass       = require('./lib/passport')(passport)
var helpers         = require('view-helpers')
// Service Port
var port = process.env.PORT || 8080

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//MongoDB
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

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'driveonbeta', saveUninitialized: true, resave: true,cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('driveonbeta'));
app.use(flash());
app.use(helpers('analytics'))
app.use(express.static(path.join(__dirname, 'public')));

// Set Service Scope for Intercharge messages
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// Set Main Route
app.use('/', routes)

// Set
app.listen(port, function () {
    console.log('Analytics-API listening on port ' + port)
})