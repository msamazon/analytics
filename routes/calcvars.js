var passport        = require('passport')
var router          = require('express').Router()

var CalcVar = require('../controllers/calcvarController')

    // ++++++++++++++++++++++ Profile +++++++++++++++++++++++++++
// List all Users
router.get('/',   CalcVar.list);
// Get single user by id
router.get('/show/:id',  CalcVar.show);
// Create user
router.get('/new',  CalcVar.create);
// Save user
router.post('/save',  CalcVar.save);
// Edit user
router.get('/edit/:id',  CalcVar.edit);
// Edit user
router.post('/update/:id',  CalcVar.update);
// Delete
router.post('/delete/:id',  CalcVar.delete);

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