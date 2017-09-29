var express     = require('express')
var router      = express.Router()
var jwt         = require('jsonwebtoken')
var getToken    = require('../lib/getToken')
var message     = require("../controllers/messageController.js")
var users       = require('../controllers/userController.js')
var page        = require('../controllers/pageController.js')
var currtripinfo = require("../controllers/currenttripinfoController.js")

//users
router.post('/signup', users.signup)
router.post('/logging', users.logging)
router.post('/logout', users.logout)
router.get('/users', users.users)

//Dashboard
// Top 1
router.post('/cntMileageMonth', currtripinfo.sumTripMileage)
router.post('/chartMileageMonth', currtripinfo.chartTripMileage)
// Top 2
router.post('/cntIdleTime', currtripinfo.sumIdleEngineTime)
router.post('/chartIdleTime', currtripinfo.chartIdleEngineTime)
// Top 3
router.post('/cntHACCOccur', currtripinfo.cntHarshAcc)
router.post('/chartHACCOccur', currtripinfo.chartHarshAcc)
// Top 4
router.post('/cntHBRAKEOccur', currtripinfo.cntHarshBrake)
router.post('/chartHBRAKEOccur', currtripinfo.chartHarshBrake)

// Generic Tools
router.post('/calAlarm', currtripinfo.calAlarm)
router.post('/stub', currtripinfo.stub)

//Locates
router.get('/message/gps/:id', message.getgeo)

//Pages
router.get('/', page.index)
router.get('/locate', page.locate)
router.get('/myvehicle', page.myvehicle)
router.get('/alarmes', page.alarmes)
router.get('/analytics', page.analytics)
router.get('/dashboard',page.main)
router.get('/login', page.login)

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {    
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/');
    }

module.exports =  router