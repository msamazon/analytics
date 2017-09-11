var express = require('express');
var router = express.Router();

var eventos = require('../controllers/do_car_a00');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DriveOn Portal' });
});

/* GET Alarms and Events. */
// router.get('/do_car_a00', eventos.listEvents);

module.exports = router;
