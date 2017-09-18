var mongoose = require("mongoose")
var DO_CAR_C01 = require("../models/CurrentTripInfo")

var currenttripinfoController = {}

currenttripinfoController.list = function(req, res) {

  var dInit = req.body.dStartd
  var dFinish = req.body.dEndd
  DO_CAR_C01.find({'dreceived':{'$gte':dInit},'dreceived':{'$lte':dFinish}}).sort({$natural :1}).exec(function (err, currinfo) {
    
    // console.log("Message: %s", message)
    if (err) {
      console.log("Error:", err);
    }else {
      var arrayCurrinfo = []

      for(var i = 0; i < currinfo.length; i++) {

        var id                          = currinfo[i]._id
        var dongleCode                  = currinfo[i].dongleCode
        var gpsData                     = currinfo[i].gpsData
        var currentTripDuration         = currinfo[i].currentTripDuration
        var currentTripFuelConsumption  = currinfo[i].currentTripFuelConsumption
        var currentTripMileage          = currinfo[i].currentTripMileage
        var dreceived                   = currinfo[i].dreceived
        var treceived                   = currinfo[i].treceived

        var message0 =  { "_id": _id, "gpsData": gpsData, "currentTripDuration": currentTripDuration, 
        "currentTripFuelConsumption": currentTripFuelConsumption, "currentTripMileage": currentTripMileage, "dreceived": dreceived, "treceived": treceived  }
        arrayCurrinfo.push(message0)
      }        

      res.json({message: arrayCurrinfo})
    }
  })
}


currenttripinfoController.calDayTripMileage = function(req, res) {
  
  console.log('calDayTripMileage')

  var date = req.body.date

  DO_CAR_C01.find({'dreceived': {'$gte':date}}).sort({'treceived': 1}).exec(function(err, info) {
    var count = 0
    var last = 0
    for (var i=0; i < info.length-1; i++) {
      if(info[i].currentTripFuelConsumption > info[i+1].currentTripFuelConsumption) {
        count += info[i].currentTripFuelConsumption
        last = i
      }
    }
    if(last < info.length) {
      count += info[info.length-1].currentTripFuelConsumption
    }
    res.json({sumDay: count})
  })
}

currenttripinfoController.sumTripMileage = function(req, res) {

  console.log('sumTripMileage')
  var dInit = req.body.dStartd
  var dFinish = req.body.dEndd


  
  DO_CAR_C01.find({'dreceived':{'$gte':dInit},'dreceived':{'$lte':dFinish}}).sort({$natural :1}).exec(function (err, currinfo) {    
          if (err) {
              console.log("Error:", err);
          }else {
              var sumcurrentTripMileage = 0

              var arrayCurrinfo = []

              for(var i = 0; i < currinfo.length; i++) {
      
                  var currentTripMileage  = currinfo[i].currentTripMileage
                  sumcurrentTripMileage   = sumcurrentTripMileage + currentTripMileage

                  var message0 =  { "sumcurrentTripMileage": sumcurrentTripMileage  }
                  arrayCurrinfo.push(message0)
                     
              }   
              
              res.json({CurrTripInfo: arrayCurrinfo})
          }
  })
  };

  module.exports = currenttripinfoController