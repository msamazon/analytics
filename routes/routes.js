var util        = require('util')
module.exports = function(router, passport) {
    var jwt         = require('jsonwebtoken')
    var getToken    = require('../lib/getToken')    
    var users       = require('../controllers/userController.js')
    var devices     = require('../controllers/deviceController.js')
    var UserProfile = require('../controllers/profileController.js')

    var message     = require("../controllers/messageController.js")
    var page        = require('../controllers/pageController.js')
    var currtripinfo = require("../controllers/currenttripinfoController.js")    
    var masterdata  = require('../controllers/masterController')
    var zones       = require('../controllers/zonesController')
    // var middleware  = require('./middleware')
    

// router.pre('render', middleware.flashMessages); Depois checo isso
// router.get('/login', page.login)
router.get('/login', function(req, res) {    
    res.render('login', { title: 'DriveOn Portal', message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}),
function(req, res) {
    if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 30;
    } else {
        req.session.cookie.expires = false;
    }
    res.redirect('/login');
 });

 router.get('/logout', users.logout)



//Dashboard
// Top 1
router.post('/cntMileageMonth', isLoggedIn, currtripinfo.sumTripMileage)
router.post('/chartMileageMonth', isLoggedIn, currtripinfo.chartTripMileage)
// Top 2
router.post('/cntIdleTime', isLoggedIn,  currtripinfo.sumIdleEngineTime)
router.post('/chartIdleTime', isLoggedIn,  currtripinfo.chartIdleEngineTime)
// Top 3
router.post('/cntHACCOccur', isLoggedIn, currtripinfo.cntHarshAcc)
router.post('/chartHACCOccur', isLoggedIn, currtripinfo.chartHarshAcc)
// Top 4
router.post('/cntHBRAKEOccur', isLoggedIn,  currtripinfo.cntHarshBrake)
router.post('/chartHBRAKEOccur', isLoggedIn,  currtripinfo.chartHarshBrake)


// From Index Monthly Grid
router.post('/cntDevConnected', isLoggedIn, devices.cntVehiclesConnecteds)
router.post('/cntDevDisconnected', isLoggedIn, devices.cntVehiclesDisconnecteds)
router.post('/cntSOS', isLoggedIn, message.SOSCounter)
router.post('/cntReb', isLoggedIn, message.GuinchoCounter)
router.post('/cntMIL', isLoggedIn, message.MILCounter)
router.post('/sumGAS/:id', isLoggedIn, message.GASsum)
router.post('/getmotorTemp/:id', isLoggedIn,  message.chartMotorTemp)
// Generic Tools
router.post('/calAlarm',  currtripinfo.calAlarm)
router.post('/stub',  currtripinfo.stub)

//Locates
router.get('/message/gps/:id',  message.getgeo)
router.get('/message/gpslist/:id',  message.getgeolist)

//Pages
// router.get('/', isLoggedIn, page.index)
router.get('/', isLoggedIn, masterdata.list)
router.get('/locate', isLoggedIn, page.locate)
router.get('/trips', isLoggedIn, masterdata.listsimple)
router.get('/alarmes', isLoggedIn, message.getAlarm)
router.get('/analytics', isLoggedIn, page.analytics)
// router.get('/dashboard', isLoggedIn,  page.main)


// Zones
router.get('/zones', isLoggedIn,  zones.list)

// ++++++++++++++++++++++ Devices +++++++++++++++++++++++++++
// List all dongles
router.get('/devices', isLoggedIn, devices.list);
// Get single dongle by id
router.get('/devices/show/:id', isLoggedIn, devices.show);
// Create dongle
router.get('/devices/new', isLoggedIn, devices.create);
// Save dongle
router.post('/devices/save', isLoggedIn, devices.save);
// Edit dongle
router.get('/devices/edit/:id', isLoggedIn, devices.edit);
// Edit dongle
router.post('/devices/update/:id', isLoggedIn, devices.update);
// Delete
router.get('/devices/delete/:id', isLoggedIn, devices.delete);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// ++++++++++++++++++++++ Users +++++++++++++++++++++++++++
// List all Users
router.get('/users',  users.list);
// Get single user by id
router.get('/users/show/:id', isLoggedIn, users.show);
// Create user
router.get('/users/new', isLoggedIn, users.create);
// Save user
router.post('/users/save', isLoggedIn, users.save);
// Edit user
router.get('/users/edit/:id', isLoggedIn, users.edit);
// Edit user
router.post('/users/update/:id', isLoggedIn, users.update);
// Delete
router.get('/users/delete/:id', isLoggedIn, users.delete);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++ Profile +++++++++++++++++++++++++++
// List all Users
router.get('/profiles',  UserProfile.list);
// Get single user by id
router.get('/profiles/show/:id', isLoggedIn, UserProfile.show);
// Create user
router.get('/profiles/new', isLoggedIn, UserProfile.create);
// Save user
router.post('/profiles/save', isLoggedIn, UserProfile.save);
// Edit user
router.get('/profiles/edit/:id', isLoggedIn, UserProfile.edit);
// Edit user
router.post('/profiles/update/:id', isLoggedIn, UserProfile.update);
// Delete
router.get('/profiles/delete/:id', isLoggedIn, UserProfile.delete);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

} 

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {    
        // if user is authenticated in the session, carry on 
        // console.log('Acessou isAuthenticated:'+ req.isAuthenticated())
        // console.log('Req data for auth:'+ util.inspect(req))
        if (req.isAuthenticated())        
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/login');
    }

// module.exports = router