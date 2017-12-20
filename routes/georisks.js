var passport        = require('passport')
var router          = require('express').Router()

var Georisk = require('../controllers/georiskController')

// ++++++++++++++++++++++ Georisks +++++++++++++++++++++++++++
// List all georisk
router.get('/', isLoggedIn, Georisk.list)
// Get single georisk by id
router.get('/show/:id', isLoggedIn,  Georisk.show)
// Create georisk
router.get('/new', isLoggedIn,  Georisk.create)
// Save georisk
router.post('/save', isLoggedIn,  Georisk.save)
// Edit georisk
router.get('/edit/:id', isLoggedIn,  Georisk.edit)
// Edit georisk
router.post('/update/:id', isLoggedIn,  Georisk.update)
// Delete
router.post('/delete/:id', isLoggedIn, Georisk.delete)

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