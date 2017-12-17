var passport        = require('passport')
var router          = require('express').Router()

var UserProfile = require('../controllers/profileController.js')

    // ++++++++++++++++++++++ Profile +++++++++++++++++++++++++++
// List all Users
router.get('/',   UserProfile.list);
// Get single user by id
router.get('/show/:id',  UserProfile.show);
// Create user
router.get('/new',  UserProfile.create);
// Save user
router.post('/save',  UserProfile.save);
// Edit user
router.get('/edit/:id',  UserProfile.edit);
// Edit user
router.post('/update/:id',  UserProfile.update);
// Delete
router.get('/delete/:id',  UserProfile.delete);
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