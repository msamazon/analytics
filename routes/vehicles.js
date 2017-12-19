var passport        = require('passport')
var router          = require('express').Router()

var Vehicle = require('../controllers/vehicleController')

// ++++++++++++++++++++++ Vehicle +++++++++++++++++++++++++++
// List all Users
router.get('/', isLoggedIn,  Vehicle.list)
// Get single user by id
router.get('/show/:id', isLoggedIn, Vehicle.show)
// Create user
router.get('/new', isLoggedIn, Vehicle.create)
// Save user
router.post('/save', isLoggedIn, Vehicle.save)
// Edit user
router.get('/edit/:id', isLoggedIn, Vehicle.edit)
// Edit user
router.post('/update/:id', isLoggedIn, Vehicle.update)
// Delete
router.post('/delete/:id', isLoggedIn,  Vehicle.delete)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router

function isLoggedIn(req, res, next) {    
    // if user is authenticated in the session, carry on 
    // console.log('Acessou isAuthenticated:'+ req.isAuthenticated())
    // console.log('Req data for auth:'+ util.inspect(req))
    if (req.isAuthenticated())        
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}