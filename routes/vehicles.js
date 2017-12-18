var passport        = require('passport')
var router          = require('express').Router()

var Vehicle = require('../controllers/vehicleController')

    // ++++++++++++++++++++++ Profile +++++++++++++++++++++++++++
// List all Users
router.get('/',   Vehicle.list);
// Get single user by id
router.get('/show/:id',  Vehicle.show);
// Create user
router.get('/new',  Vehicle.create);
// Save user
router.post('/save',  Vehicle.save);
// Edit user
router.get('/edit/:id',  Vehicle.edit);
// Edit user
router.post('/update/:id',  Vehicle.update);
// Delete
router.post('/delete/:id',  Vehicle.delete);

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