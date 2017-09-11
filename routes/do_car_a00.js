'use strict';
module.exports = function(app) {
  var events = require('../controllers/do_car_a00');

//  GET Events(Alarms, etc) 
app.route('/do_car_a00/:companyId')
    .get(events.listEventsByCompany);   
};