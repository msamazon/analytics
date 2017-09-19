var express         = require('express')
var app             = express()
var bodyParser      = require('body-parser')
var mongoose        = require('mongoose')
var passport        = require('passport')
var jwt             = require('jsonwebtoken')
var config          = require('./lib/config')
var routes          = require('./routes/api.js')
var path            = require('path')

var port = process.env.PORT || 8080

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


app.use('/', routes)

app.listen(port, function () {
    console.log('Analytics-API listening on port ' + port)
})

app.get('/', function(req, res) {
    res.redirect('/dashboard');
})

app.get('/locate', function(req, res) {
    res.redirect('/locate');
})