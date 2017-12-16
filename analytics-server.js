//Modules
var express         = require('express')
var app             = express()
var bodyParser      = require('body-parser')
var mongoose        = require('mongoose')
var passport        = require('passport')
// var jwt             = require('jsonwebtoken')
var config          = require('./lib/config')
// var routes          = require('./routes/routes.js')
var path            = require('path')
var flash           = require('req-flash')
var cookieParser    = require('cookie-parser')
var session         = require('express-session')
var localpass       = require('./lib/passport')(passport)
var helpers         = require('view-helpers')
var dotenv          = require('dotenv').config()
var expressValidator= require('express-validator')
// var grappling       = require('grappling-hook');
var favicon 		= require('serve-favicon');
require('./lib/passport')(passport);
// Service Port
var port = process.env.PORT || 4884


// grappling.mixin(app).allowHooks('pre:static', 'pre:bodyparser', 'pre:session', 'pre:logger', 'pre:admin', 'pre:routes', 'pre:render', 'updates', 'signin', 'signout','login');

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// MongoDB
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
app.use(expressValidator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(session({
//         secret: 'driveonsecret', 
//         rolling: true, 
//         saveUninitialized: true, 
//         resave:true, 
//         cookie: { maxAge: 60000 }
//         }))
app.use(session({secret:'driveonsecret', resave: false, saveUninitialized: false, cookie: { maxAge: 1000 * 60 * 60 * 24 } }))
app.use(passport.initialize())
app.use(passport.session())

app.use(cookieParser())
app.use(flash())

app.use(helpers('dashboard'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Set Service Scope for Intercharge messages
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// Set Main Route
// app.use('/', routes)
require('./routes/routes.js')(app, passport);
// Set
app.listen(port, function () {
    console.log(`Analytics-Dashboard listening on ${port}`)
})