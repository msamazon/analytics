module.exports = function(router, passport) {
    var jwt         = require('jsonwebtoken')
    var getToken    = require('../lib/getToken')    
    var message     = require("../controllers/messageController.js")
    var users       = require('../controllers/userController.js')
    var page        = require('../controllers/pageController.js')
    var currtripinfo = require("../controllers/currenttripinfoController.js")
    var devices     = require('../controllers/deviceController.js')
    var masterdata  = require('../controllers/masterController')
    var zones       = require('../controllers/zonesController')
    // var middleware  = require('./middleware')
    // Session Variable
    var sess;

//
// router.pre('render', middleware.flashMessages); Depois checo isso
// router.get('/login', page.login)
router.get('/login', function(req, res) {    
    res.render('login', { title: 'DriveOn Portal', message: req.flash('loginMessage') });
});
// router.post('/login', function(req, res, next) {    
//     passport.authenticate('local-login', function(err, user, info) {
//         if (err) { return next(err); }
        
//         if (!user) { return res.render('login', {message: req.flash('loginMessage')}); }
//         req.logIn(user, function(err) {
//             if (err) { return next(err); }
//             return res.redirect('/');
//         });
//     })(req, res, next);
// });

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
// router.get('/users', users.users)

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

// User Management
// router.get('/userlist', isLoggedIn,  users.userlist)

// Zones
router.get('/zones', isLoggedIn,  zones.list)

// ++++++++++++++++++++++ Devices +++++++++++++++++++++++++++
// List all dongles
router.get('/devices', isLoggedIn, devices.list);
// Get single dongle by id
router.get('/device/show/:id', isLoggedIn, devices.show);
// Create dongle
router.get('/devicecreate', isLoggedIn, devices.create);
// Save dongle
router.post('/device/save', isLoggedIn, devices.save);
// Edit dongle
router.get('/device/edit/:id', isLoggedIn, devices.edit);
// Edit dongle
router.post('/device/update/:id', isLoggedIn, devices.update);
// Delete
router.get('/device/delete/:id', isLoggedIn, devices.delete);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// ++++++++++++++++++++++ Users +++++++++++++++++++++++++++
// List all Users
// router.get('/users', isLoggedIn, user.list);
router.get('/users', isLoggedIn, users.list);
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
} 

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {    
        // if user is authenticated in the session, carry on 
        // console.log('Acessou isAuthenticated:'+ req.isAuthenticated())
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/');
    }

// module.exports = router