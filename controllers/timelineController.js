var mongoose = require("mongoose")
var Timeline = require("../models/timeline")

var timelineController = {}

timelineController.list = function(req, res) {

  var deviceId = req.params.id

  DO_myvehicle_timeline_per_day.find({'Device':deviceId}).exec(function (err, timeline) {
    
    // console.log("Message: %s", message)
    if (err) {
      console.log("Error:", err);
    }else {
      var arrayMessage = []

      for(var i = 0; i < timeline.length; i++) {

        var id             = timeline[i]._id
        var Veiculo        = timeline[i].Veiculo
        var Device         = timeline[i].Device
        var Data   = timeline[i].Data
        var Hora      = timeline[i].Hora
        var Ignition     = timeline[i].dongleCode

        var message0 =  { "_id": id, "Veiculo": Veiculo, "Device": Device, 
        "Data": Data, "Hora": Hora, "Ignition": Ignition }
        arrayMessage.push(message0)
      }        

      res.json({message: arrayMessage})
    }
  })
}

  module.exports = timelineController