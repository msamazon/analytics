// var passport        = require('passport')
// var router          = require('express').Router()

// var UserAuthority = require('../controllers/authorityController')

//     // ++++++++++++++++++++++ Profile +++++++++++++++++++++++++++
// // List all Users
// router.get('/',   UserAuthority.list);
// // Get single user by id
// router.get('/show/:id',  UserAuthority.show);
// // Create user
// router.get('/new',  UserAuthority.create);
// // Save user
// router.post('/save',  UserAuthority.save);
// // Edit user
// router.get('/edit/:id',  UserAuthority.edit);
// // Edit user
// router.post('/update/:id',  UserAuthority.update);
// // Delete
// router.post('/delete/:id',  UserAuthority.delete);

// // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// module.exports = router

// function isLoggedIn(req, res, next) {    
//     // if user is authenticated in the session, carry on 
//     // console.log('Acessou isAuthenticated:'+ req.isAuthenticated())
//     // console.log('Req data for auth:'+ util.inspect(req))
//     if (req.isAuthenticated())        
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/login');
// }