var express = require('express');
var router = express.Router();

var timeline = require("../controllers/timelineController");

// Timeline
router.get('/alarms/:id', timeline.list);

module.exports = router;