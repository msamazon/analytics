var passport        = require('passport')
var router          = require('express').Router()

var Customer = require('../controllers/customerController')

    // ++++++++++++++++++++++ Profile +++++++++++++++++++++++++++
// List all Users
router.get('/',   Customer.list);
// Get single user by id
router.get('/show/:id',  Customer.show);
// Create user
router.get('/new',  Customer.create);
// Save user
router.post('/save',  Customer.save);
// Edit user
router.get('/edit/:id',  Customer.edit);
// Edit user
router.post('/update/:id',  Customer.update);
// Delete
router.post('/delete/:id',  Customer.delete);

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