var express = require('express');
var router = express.Router();

var message = require("../controllers/messageController.js");

router.get('/', function(req, res, next) {

    // Provide Current Week to show up data on Grid
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    
    var firstday = new Date(curr.setDate(first)).toLocaleDateString('pt-BR');
    var lastday = new Date(curr.setDate(last)).toLocaleDateString('pt-BR');

    res.render('index', { title: 'DriveOn Portal', params:{CurWStart:firstday, CurWEnd:lastday} });  
});

// Messages
router.get('/message/:id', message.list);
router.get('/message/gps/:id', message.getgeo);
// Get single message by id
router.get('/message/show/:id', message.show);

module.exports = router;