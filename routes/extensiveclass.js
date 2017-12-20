var passport        = require('passport')
var router          = require('express').Router()

var ExtensiveClass = require('../controllers/extensiveclassController')

// ++++++++++++++++++++++ Ext. Classes +++++++++++++++++++++++++++
// List all ECLASS
router.get('/', isLoggedIn, ExtensiveClass.list)
// Get single ECLASS by id
router.get('/show/:id', isLoggedIn,  ExtensiveClass.show)
// Create ECLASS
router.get('/new', isLoggedIn,  ExtensiveClass.create)
// Save ECLASS
router.post('/save', isLoggedIn,  ExtensiveClass.save)
// Edit ECLASS
router.get('/edit/:id', isLoggedIn,  ExtensiveClass.edit)
// Edit ECLASS
router.post('/update/:id', isLoggedIn,  ExtensiveClass.update)
// Delete
router.post('/delete/:id', isLoggedIn, ExtensiveClass.delete)

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