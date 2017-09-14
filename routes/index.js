var express = require('express');
var router = express.Router();

var message = require("../controllers/messageController.js");


router.get('/', function(req, res, next) {
    res.render('index', { title: 'DriveOn Portal' });  
});

// Messages
router.get('/message/:id', message.list);
router.get('/message/gps/:id', message.getgeo);
// Get single message by id
router.get('/message/show/:id', message.show);

module.exports = router;
