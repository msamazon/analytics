// var passport        = require('passport')
// var router          = require('express').Router()

// var UserMaster = require('../controllers/userController')

//     // ++++++++++++++++++++++ Profile +++++++++++++++++++++++++++
// // List all Users
// router.get('/',   UserMaster.list);
// // Get single user by id
// router.get('/show/:id',  UserMaster.show);
// // Create user
// router.get('/new',  UserMaster.create);
// // Save user
// router.post('/save',  UserMaster.save);
// // Edit user
// router.get('/edit/:id',  UserMaster.edit);
// // Edit user
// router.post('/update/:id',  UserMaster.update);
// // Delete
// router.post('/delete/:id',  UserMaster.delete);

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