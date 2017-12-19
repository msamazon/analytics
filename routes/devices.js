var passport        = require('passport')
var router          = require('express').Router()

var Device = require('../controllers/deviceController')

// ++++++++++++++++++++++ Devices +++++++++++++++++++++++++++
// List all Users
router.get('/',   Device.list);
// Get single user by id
router.get('/show/:id',  Device.show);
// Create user
router.get('/new',  Device.create);
// Save user
router.post('/save',  Device.save);
// Edit user
router.get('/edit/:id',  Device.edit);
// Edit user
router.post('/update/:id',  Device.update);
// Delete
router.post('/delete/:id',  Device.delete);

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