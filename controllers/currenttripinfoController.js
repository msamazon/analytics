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
        count += info[i].currentTripMileage
        last = i
      }
    }
    if(last < info.length) {
      count += info[info.length-1].currentTripMileage
    }
    res.json({sumDay: count/1000})
  })
}

currenttripinfoController.calDaylistTripMileage = function(req, res) {
  
  console.log('calDaylistTripMileage')

  var date = req.body.date

  DO_CAR_C01.find({'dreceived': {'$gte':date}}).sort({'treceived': 1}).exec(function(err, info) {
    var count = 0
    var last = 0
    var list = []
    for (var i=0; i < info.length-1; i++) {
      if(info[i].currentTripFuelConsumption > info[i+1].currentTripFuelConsumption) {
        count += info[i].currentTripMileage
        list.push(info[i])
        last = i
      }
    }
    if(last < info.length) {
      count += info[info.length-1].currentTripMileage
      list.push(info[info.length-1])
    }
    res.json({detailsDay: list})
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
              // var sumcurrentTripMileage = 0

              // var arrayCurrinfo = []

              // for(var i = 0; i < currinfo.length; i++) {
      
              //     var currentTripMileage  = currinfo[i].currentTripMileage
              //     sumcurrentTripMileage   = sumcurrentTripMileage + currentTripMileage

              //     var message0 =  { "sumcurrentTripMileage": sumcurrentTripMileage  }
              //     arrayCurrinfo.push(message0)
                     
              // }   
              
              // res.json({CurrTripInfo: arrayCurrinfo})

              var count = 0
              var last = 0
              var list = []
              for (var i=0; i < currinfo.length-1; i++) {
                if(currinfo[i].currentTripFuelConsumption > currinfo[i+1].currentTripFuelConsumption) {
                  count += currinfo[i].currentTripMileage
                  list.push(currinfo[i])
                  last = i
                }
              }
              if(last < currinfo.length) {
                count += currinfo[currinfo.length-1].currentTripMileage
                list.push(currinfo[currinfo.length-1])
              }
              res.json({currinfo: list})
          }
  })
  };

  module.exports = currenttripinfoController