var express = require('express');
var router = express.Router();

var message = require("../controllers/messageController.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DriveOn Portal' });
});

// Messages
router.get('/:id', message.list);
router.get('/gps/:id', message.getgeo);
// Get single message by id
router.get('/show/:id', message.show);

module.exports = router;
