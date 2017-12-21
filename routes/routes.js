var express         = require('express')
var router          = express.Router()
var user            = require('../controllers/userController')
var masterdata      = require('../controllers/masterController')
var message         = require("../controllers/messageController")
var currtripinfo    = require("../controllers/currenttripinfoController")
var devices         = require("../controllers/deviceController")
var vehicles        = require("../controllers/vehicleController")
var authority       = require("../controllers/authorityController")
var profile         = require("../controllers/profileController")
var customer        = require("../controllers/customerController")
var carval          =  require("../controllers/calcvarController")
var georisk         =  require("../controllers/georiskController")
var eclass          =  require("../controllers/extensiveclassController")
var evalo           =  require("../controllers/extensivevalueController")

// restrict index for logged in user only
// router.get('/', user.home)

// route to login page
router.get('/login', user.login);

// route for login action
router.post('/login', user.doLogin);

// route for logout action
router.get('/logout', user.logout);

// route to register page
router.get('/register', user.register);

// route for register action
router.post('/register', user.doRegister);


router.get('/', isLoggedIn, masterdata.list)
router.get('/trips', isLoggedIn, masterdata.carlist)


router.get('/alarms', isLoggedIn, vehicles.listbyUser)
router.post('/alarmsbyvehicle', isLoggedIn, message.getAlarm)
router.get('/analytics', isLoggedIn, vehicles.analyticsbyUser)
router.post('/getvoltage/:id', isLoggedIn, message.getVoltage)
router.post('/getDuration/:id', isLoggedIn, message.getDurationbyUser)

// Locates
router.get('/message/gps/:id',  message.getgeo)
router.get('/message/gpslist/:id',  message.getgeolist)



// Dashboard
// Top 1
router.post('/cntMileageMonth', isLoggedIn, currtripinfo.sumTripMileage)
router.post('/chartMileageMonth', isLoggedIn, currtripinfo.chartTripMileage)
// // Top 2
router.post('/cntIdleTime', isLoggedIn,  currtripinfo.sumIdleEngineTime)
router.post('/chartIdleTime', isLoggedIn,  currtripinfo.chartIdleEngineTime)
// // Top 3
router.post('/cntHACCOccur', isLoggedIn, currtripinfo.cntHarshAcc)
router.post('/chartHACCOccur', isLoggedIn, currtripinfo.chartHarshAcc)
// // Top 4
router.post('/cntHBRAKEOccur', isLoggedIn,  currtripinfo.cntHarshBrake)
router.post('/chartHBRAKEOccur', isLoggedIn,  currtripinfo.chartHarshBrake)


// / // From Index Monthly Grid
router.post('/cntDevConnected', isLoggedIn, devices.cntVehiclesConnecteds)
router.post('/cntDevDisconnected', isLoggedIn, devices.cntVehiclesDisconnecteds)
router.post('/cntSOS', isLoggedIn, message.SOSCounter)
router.post('/cntReb', isLoggedIn, message.GuinchoCounter)
router.post('/cntMIL', isLoggedIn, message.MILCounter)
router.post('/sumGAS', isLoggedIn, message.GASsum)


 // ++++++++++++++++++++++ Users CRUD +++++++++++++++++++++++++++
// List all Users
router.get('/users', isLoggedIn,  user.list)
// Get single user by id
router.get('/users/show/:id', isLoggedIn,  user.show)
// Create user
router.get('/users/new', isLoggedIn, user.create)
// Save user
router.post('/users/save', isLoggedIn, user.save)
// Edit user
router.get('/users/edit/:id', isLoggedIn,  user.edit)
// Edit user
router.post('/users/update/:id', isLoggedIn, user.update)
// Delete
router.post('/users/delete/:id', isLoggedIn, user.delete)

// ++++++++++++++++++++++ Authority CRUD+++++++++++++++++++++++++++

router.get('/authorities', isLoggedIn,  authority.list)

router.get('/authorities/show/:id', isLoggedIn, authority.show)

router.get('/authorities/new', isLoggedIn, authority.create)

router.post('/authorities/save',isLoggedIn, authority.save)

router.get('/authorities/edit/:id', isLoggedIn, authority.edit)

router.post('/authorities/update/:id', isLoggedIn, authority.update)

router.post('/authorities/delete/:id', isLoggedIn, authority.delete)

// // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++ Profile +++++++++++++++++++++++++++

router.get('/profiles', isLoggedIn,  profile.list)

router.get('/profiles/show/:id', isLoggedIn,  profile.show)

router.get('/profiles/new', isLoggedIn, profile.create)

router.post('/profiles/save', isLoggedIn,  profile.save)

router.get('/profiles/edit/:id',  isLoggedIn, profile.edit)

router.post('/profiles/update/:id', isLoggedIn, profile.update)

router.post('/profiles/delete/:id', isLoggedIn, profile.delete)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 // ++++++++++++++++++++++ customer +++++++++++++++++++++++++++

router.get('/customers',  isLoggedIn, customer.list)
// Get single user by id
router.get('/customers/show/:id', isLoggedIn, customer.show)
// Create user
router.get('/customers/new', isLoggedIn, customer.create)
// Save user
router.post('/customers/save', isLoggedIn, customer.save)
// Edit user
router.get('/customers/edit/:id', isLoggedIn, customer.edit)
// Edit user
router.post('/customers/update/:id',isLoggedIn,  customer.update)
// Delete
router.post('/customers/delete/:id', isLoggedIn, customer.delete)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++ Devices +++++++++++++++++++++++++++
// List all devices
router.get('/devices', isLoggedIn, devices.list)
// Get single device by id
router.get('/devices/show/:id', isLoggedIn,  devices.show)
// Create device
router.get('/devices/new', isLoggedIn,  devices.create)
// Save device
router.post('/devices/save', isLoggedIn,  devices.save)
// Edit device
router.get('/devices/edit/:id', isLoggedIn,  devices.edit)
// Edit device
router.post('/devices/update/:id', isLoggedIn,  devices.update)
// Delete
router.post('/delete/:id', isLoggedIn, devices.delete)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// / ++++++++++++++++++++++ Vehicle +++++++++++++++++++++++++++

router.get('/vehicles', isLoggedIn,  vehicles.list)

router.get('/vehicles/show/:id', isLoggedIn, vehicles.show)

router.get('/vehicles/new', isLoggedIn, vehicles.create)

router.post('/vehicles/save', isLoggedIn, vehicles.save)

router.get('/vehicles/edit/:id', isLoggedIn, vehicles.edit)

router.post('/vehicles/update/:id', isLoggedIn, vehicles.update)

router.post('/vehicles/delete/:id', isLoggedIn,  vehicles.delete)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   // ++++++++++++++++++++++ Variables +++++++++++++++++++++++++++
// List all Users
router.get('/calcvars', isLoggedIn,  carval.list)
// Get single user by id
router.get('/calcvars/show/:id',isLoggedIn,  carval.show)
// Create user
router.get('/calcvars/new',isLoggedIn,  carval.create)
// Save user
router.post('/calcvars/save', isLoggedIn, carval.save)
// Edit user
router.get('/calcvars/edit/:id',isLoggedIn,  carval.edit)
// Edit user
router.post('/calcvars/update/:id', isLoggedIn, carval.update)
// Delete
router.post('/calcvars/delete/:id', isLoggedIn, carval.delete)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++ Georisks +++++++++++++++++++++++++++
// List all georisk
router.get('/georisks', isLoggedIn, georisk.list)
// Get single georisk by id
router.get('/georisks/show/:id', isLoggedIn,  georisk.show)
// Create georisk
router.get('/georisks/new', isLoggedIn,  georisk.create)
// Save georisk
router.post('/georisks/save', isLoggedIn,  georisk.save)
// Edit georisk
router.get('/georisks/edit/:id', isLoggedIn,  georisk.edit)
// Edit georisk
router.post('/georisks/update/:id', isLoggedIn,  georisk.update)
// Delete
router.post('/georisks/delete/:id', isLoggedIn, georisk.delete)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// / ++++++++++++++++++++++ Ext. Classes +++++++++++++++++++++++++++
// List all ECLASS
router.get('/extclasses', isLoggedIn, eclass.list)
// Get single ECLASS by id
router.get('/extclasses/show/:id', isLoggedIn,  eclass.show)
// Create ECLASS
router.get('/extclasses/new', isLoggedIn,  eclass.create)
// Save ECLASS
router.post('/extclasses/save', isLoggedIn,  eclass.save)
// Edit ECLASS
router.get('/extclasses/edit/:id', isLoggedIn,  eclass.edit)
// Edit ECLASS
router.post('/extclasses/update/:id', isLoggedIn,  eclass.update)
// Delete
router.post('/extclasses/delete/:id', isLoggedIn, eclass.delete)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++ Ext. Value +++++++++++++++++++++++++++
// List all EVALUE
router.get('/extensivevalues', isLoggedIn, evalo.list)
// Get single EVALUE by id
router.get('/extensivevalues/show/:id', isLoggedIn,  evalo.show)
// Create EVALUE
router.get('/extensivevalues/new', isLoggedIn,  evalo.create)
// Save EVALUE
router.post('/extensivevalues/save', isLoggedIn,  evalo.save)
// Edit EVALUE
router.get('/extensivevalues/edit/:id', isLoggedIn,  evalo.edit)
// Edit EVALUE
router.post('/extensivevalues/update/:id', isLoggedIn,  evalo.update)
// Delete
router.post('/extensivevalues/delete/:id', isLoggedIn, evalo.delete)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router

function isLoggedIn(req, res, next) {            
        if (req.isAuthenticated())        
            return next();
    
        res.redirect('/login');
    }