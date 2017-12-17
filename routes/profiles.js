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