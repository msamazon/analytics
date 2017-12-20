var passport        = require('passport')
var router          = require('express').Router()

var ExtensiveValue = require('../controllers/extensivevalueController')

// ++++++++++++++++++++++ Ext. Value +++++++++++++++++++++++++++
// List all EVALUE
router.get('/', isLoggedIn, ExtensiveValue.list)
// Get single EVALUE by id
router.get('/show/:id', isLoggedIn,  ExtensiveValue.show)
// Create EVALUE
router.get('/new', isLoggedIn,  ExtensiveValue.create)
// Save EVALUE
router.post('/save', isLoggedIn,  ExtensiveValue.save)
// Edit EVALUE
router.get('/edit/:id', isLoggedIn,  ExtensiveValue.edit)
// Edit EVALUE
router.post('/update/:id', isLoggedIn,  ExtensiveValue.update)
// Delete
router.post('/delete/:id', isLoggedIn, ExtensiveValue.delete)

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