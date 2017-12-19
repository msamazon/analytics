var passport        = require('passport')
var router          = require('express').Router()

var Device = require('../controllers/deviceController')

// ++++++++++++++++++++++ Devices +++++++++++++++++++++++++++
// List all devices
router.get('/', isLoggedIn, Device.list)
// Get single device by id
router.get('/show/:id', isLoggedIn,  Device.show)
// Create device
router.get('/new', isLoggedIn,  Device.create)
// Save device
router.post('/save', isLoggedIn,  Device.save)
// Edit device
router.get('/edit/:id', isLoggedIn,  Device.edit)
// Edit device
router.post('/update/:id', isLoggedIn,  Device.update)
// Delete
router.post('/delete/:id', isLoggedIn, Device.delete)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router

function isLoggedIn(req, res, next) {    
    // if device is authenticated in the session, carry on 
    // console.log('Acessou isAuthenticated:'+ req.isAuthenticated())
    // console.log('Req data for auth:'+ util.inspect(req))
    if (req.isAuthenticated())        
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}