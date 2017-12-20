var express         = require('express')
var router          = express.Router()


var profileController       = require('../controllers/profileController')
var authoritiesController   = require('../controllers/authorityController')
var userController          = require('../controllers/userController')
var customerController      = require('../controllers/customerController')
var vehicleController       = require('../controllers/vehicleController')

router.get('/', function(req, res) {
    res.json({ message: 'Analytics' })
})


/**
 * profiles
*/

// List all Users
router.get('/profiles', profileController.list)

// Get single user by id
router.get('/profiles/show/:id', profileController.show)

// Create user
router.get('/profiles/new', profileController.create)

// Save user
router.post('/profiles/save', profileController.save)

// Edit user
router.get('/profiles/edit/:id', profileController.edit)

// Edit user
router.post('/profiles/update/:id', profileController.update)

// Delete
router.post('/profiles/delete/:id', profileController.delete)


/**
 * authorities
 */
router.get('/authorities', authoritiesController.list)
// Get single user by id
router.get('/authorities/show/:id', authoritiesController.show)
// Create user
router.get('/authorities/new', authoritiesController.create)
// Save user
router.post('/authorities/save', authoritiesController.save)
// Edit user
router.get('/authorities/edit/:id', authoritiesController.edit)
// Edit user
router.post('/authorities/update/:id', authoritiesController.update)
// Delete
router.post('/authorities/delete/:id', authoritiesController.delete)

/**
 * user
*/

// List all Users
router.get('/', userController.list);
// Get single user by id
router.get('/show/:id', userController.show)
// Create user
router.get('/new', userController.create)
// Save user
router.post('/save', userController.save)
// Edit user
router.get('/edit/:id', userController.edit)
// Edit user
router.post('/update/:id', userController.update)
// Delete
router.post('/delete/:id', userController.delete)


/**
 * customers
*/

// List all Users
router.get('/customers', customerController.list);
// Get single user by id
router.get('/customers/show/:id', customerController.show);
// Create user
router.get('/customers/new', customerController.create);
// Save user
router.post('/customers/save', customerController.save);
// Edit user
router.get('/customers/edit/:id', customerController.edit);
// Edit user
router.post('/customers/update/:id', customerController.update);
// Delete
router.post('/customers/delete/:id', customerController.delete);

/**
 * vehicles
*/

// List all Users
router.get('/vehicles', vehicleController.list);
// Get single user by id
router.get('/vehicles/show/:id', vehicleController.show)
// Create user
router.get('/vehicles/new', vehicleController.create)
// Save user
router.post('/vehicles/save', vehicleController.save)
// Edit user
router.get('/vehicles/edit/:id', vehicleController.edit)
// Edit user
router.post('/vehicles/update/:id', vehicleController.update)
// Delete
router.post('/vehicles/delete/:id', vehicleController.delete)


// Set Main Route
// app.use('/', require('./routes/routes'))

module.exports = router