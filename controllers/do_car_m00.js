var mongoose = require("mongoose")
var Vehicle = require("../models/do_car_m00")

var vehicleController = {}

vehicleController.list = function(req, res) {
  
    Vehicle.find({'activeStatus':'yes'}).sort({'dateReceived' : -1}).exec(function (err, Vehicle) {
    
    console.log("Veiculos:"+ Vehicle);

    if (err) {
      console.log("Error on Get Vehicle:", err);
    }else {
      var arrayVehicle = [];

          for(var i = 0; i < Vehicle.length; i++) {

            var vehicleId   = vehicles[i].vehicleId;
            var deviceId    = vehicles[i].deviceId;
            var vin         = vehicles[i].vin;
            var plate       = vehicles[i].plate;
            var model       = vehicles[i].model;
            var color       = vehicles[i].color;
            var state       = vehicles[i].state;
            var ownerId     = vehicles[i].ownerId;
            var createdAt   = vehicles[i].createdAt;
            var createdBy   = vehicles[i].createdBy;
            var motor       = vehicles[i].motor;
            var fueltype    = vehicles[i].fueltype;
            var manufYear   = vehicles[i].manufYear;

               var vehicles0 =  { "_id": vehicleId, "deviceId": deviceId, "vin": vin, 
              "plate": plate, "model": model, "color": color, "state": state, "ownerId": ownerId, "createdAt": createdAt,
              "createdBy": createdBy, "motor": motor, "fueltype": fueltype, "manufYear": manufYear
              }
              arrayVehicle.push(vehicles0);                 
          }        
      res.json({Vehicle: vehicleId});
    }
  })
}

module.exports = vehicleController;