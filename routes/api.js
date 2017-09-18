var express     = require('express')

var router      = express.Router()
var jwt         = require('jsonwebtoken')
var getToken    = require('../lib/getToken')

var message = require("../controllers/messageController.js")
var users = require('../controllers/userController.js')
//var page = require('../controllers/pageController.js')
var currtripinfo = require("../controllers/currenttripinfoController.js")


router.get('/', function(req, res) {
    res.json({ message: 'Analytics-api' })
})

//users
router.post('/signup', users.signup)
router.post('/login', users.login)
router.post('/logout', users.logout)
router.get('/users', users.users)

router.post('/cntMileageMonth', currtripinfo.sumTripMileage)
    
//  //devices
//  router.get('/devices', devices.devices)
//  router.get('/device/:id', devices.deviceid)
//  router.get('/device/gps/:id', devices.devicesgpsid)

//page

// router.get('/locate', page.locate)
// router.get('/myvehicle', page.myvehicle)
// router.get('/alarmes', page.alarmes)
// router.get('/analytics', page.analytics)

// app.get('/locate', function(req, res){
//   res.render('locate', {
//     title: 'Drive On Portal | Localizar'
//   });
// });

// app.get('/myvehicle', function(req, res){
//   res.render('myvehicle', {
//     title: 'Drive On Portal | Meu veículo'
//   });
// });

// app.get('/alarmes', function(req, res){
//   res.render('ealarms', {
//     title: 'Drive On Portal | Alarmes'
//   });
// });

// app.get('/analytics', function(req, res){
//   res.render('analytics', {
//     title: 'Drive On Portal | Analytics Data'
//   });
// });

 module.exports =  router