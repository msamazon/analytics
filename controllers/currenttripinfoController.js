var mongoose = require("mongoose")
var DO_CAR_C01 = require("../models/CurrentTripInfo")
// var DO_CAR_A03 = require("../models/do_car_a03")
var DO_CAR_M00 = require("../models/Vehicles")
// var DO_CAR_C02 = require("../models/do_car_c02")
// var DO_CAR_C03 = require("../models/do_car_c03")
// var DO_CAR_A10 = require("../models/do_car_a10")
// var DO_CAR_A11 = require("../models/do_car_a11")
var DO_COM_M00 = require("../models/do_com_m00")
// var DO_STAT_M00 = require("../models/do_stat_m00")

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

currenttripinfoController.calAlarm = function(req, res) {
  
  console.log('calAlarm')

  var array = []
  // DO_CAR_A03.find().exec(function (err, info) {

  //   console.log("info.length %s", info.length)
  //   var count = 0
  //   for (var i =0; i < info.length; i++) {

  //     console.log(info[i].Min)

  //     count += Number(info[i].Min)

  //     array.push(info[i])
  //   }
  //   res.json({alarm: array, total: count})
  // })
 }

// Main Blocks
currenttripinfoController.sumIdleEngineTime = function(req, res) {
  
  console.log('sumIdleEngineTime')
  var array = []
  // DO_CAR_A03.find().exec(function (err, info) {
  //   console.log("info.length %s", info.length)    
  //   if (err) {
  //       console.log("sumIdleEngineTime Error:", err);
  //   }else {
  //     var sumIdleEngine = 0
  //     for (var i =0; i < info.length; i++) {
  //       sumIdleEngine += Number(info[i].Min)
  //     }
  //   } 
  //   res.json({sumIdleTime: sumIdleEngine})
  // })

 }

currenttripinfoController.chartIdleEngineTime = function(req, res) {
  
  console.log('chartIdleEngineTime')
  var array = []
  // DO_CAR_A03.find().exec(function (err, currinfo) {
  //   if (err) {
  //       console.log("chartIdleEngineTime Error:", err);
  //   }else {
  //     var arrayMessage = []      
  //     for(var i = 0; i < currinfo.length; i++) {
  //       var id                        = currinfo[i]._id
  //       var Data                      = currinfo[i].Data
  //       var Min                       = currinfo[i].Min
  //       var message0 =  { "_id": id, "Data": Data, "Min": Min }
  //       arrayMessage.push(message0)
  //     }   
  //     res.json(arrayMessage)
  //   } 
  // })

 }

currenttripinfoController.sumTripMileage = function(req, res) {
  
  // DO_CAR_C02.find().exec(function (err, currinfo) {    
  //         if (err) {
  //             console.log("Error:", err);
  //         }else {
  //             var sumcurrentTripMileage = 0

  //             var arrayCurrinfo = []
  //             // console.log("Retorno do banco:" + currinfo.length)
  //             for(var i = 0; i < currinfo.length; i++) {
      
  //                 var currentTripMileage  = currinfo[i].TotDeslocamento
  //                 sumcurrentTripMileage   = sumcurrentTripMileage + currentTripMileage
  //             }   
  //             var message0 =  { "sumcurrentTripMileage": Math.round(sumcurrentTripMileage)  }
  //             arrayCurrinfo.push(message0)
  //             // res.json({message:arrayCurrinfo})
  //             res.json(message0) 
  //         }
  // })
 }

currenttripinfoController.chartTripMileage = function(req, res) {
  
  // DO_CAR_C03.find().sort({dreceived:1}).exec(function (err, currinfo) {    
  //         if (err) {
  //             console.log("chartTripMileage Error:", err);
  //         }else {
  //           var arrayMessage = []

  //                 for(var i = 0; i < currinfo.length; i++) {
            
  //                   var id                        = currinfo[i]._id
  //                   var dreceived                 = currinfo[i].dreceived
  //                   var TotDeslocamento           = currinfo[i].TotDeslocamento
  //                   var message0 =  { "_id": id, "dreceived": dreceived, "TotDeslocamento": TotDeslocamento }
  //                   arrayMessage.push(message0)
  //                 }        
            
  //                 res.json(arrayMessage)
  //         }
  // })
 }


currenttripinfoController.cntHarshAcc = function(req, res) {
  
  // DO_CAR_A10.find().exec(function (err, currinfo) {    
  //         if (err) {
  //             console.log("cntHarshAcc Error:", err);
  //         }else{
  //             var cntHACC = 0
  //             // var arrayCurrinfo = []
  //             // console.log("Retorno do banco:" + currinfo.length)
  //             if (currinfo.length > 0) {
  //               cntHACC = currinfo.length
  //             }
                 
  //             var message0 =  { "cntHACCOccur": cntHACC  }
  //             // arrayCurrinfo.push(message0)
  //             // res.json({message:arrayCurrinfo})
  //             res.json(message0)              

  //         }
  // })
 }

currenttripinfoController.chartHarshAcc = function(req, res) {  
  // DO_CAR_A10.find().exec(function (err, currinfo) {    
  //         if (err) {
  //             console.log("chartHarshAcc Error:", err);
  //         }else {
  //           var arrayMessage = []            
  //           var newDt = ''
  //           var cntAlarms = 1
  //           for(var i = 0; i < currinfo.length; i++) {      
  //             var Data = currinfo[i].Data
  //             var Hora = currinfo[i].Hora
  //             if (Data == newDt){
  //               cntAlarms += 1;
  //             }else{
  //               var message0 =  { "Data": Data,"cntAlarms": cntAlarms }
  //               arrayMessage.push(message0)
  //               newDt = Data 
  //             }             
  //           }      
  //           res.json(arrayMessage)            
  //         }
  // })
 }


currenttripinfoController.cntHarshBrake = function(req, res) {
  
  // DO_CAR_A11.find().exec(function (err, currinfo) {    
  //         if (err) {
  //             console.log("cntHarshBrake Error:", err);
  //         }else {
  //             var cntHBRAKE = 0
  //             // var arrayCurrinfo = []
  //             // console.log("Retorno do banco:" + currinfo.length)
  //             if (currinfo.length > 0) {
  //               cntHBRAKE = currinfo.length
  //             }
                 
  //             var message0 =  { "cntHBRAKEOccur": cntHBRAKE  }
  //             // arrayCurrinfo.push(message0)
  //             // res.json({message:arrayCurrinfo})
  //             res.json(message0)              

  //         }
  // })
 }


currenttripinfoController.chartHarshBrake = function(req, res) {  
  // DO_CAR_A11.find().exec(function (err, currinfo) {    
  //         if (err) {
  //             console.log("chartHarshBrake Error:", err);
  //         }else {
  //           var arrayMessage = []            
  //           var newDt = ''
  //           var cntAlarms = 1
  //           for(var i = 0; i < currinfo.length; i++) {      
  //             var Data = currinfo[i].Data
  //             var Hora = currinfo[i].Hora
  //             if (Data == newDt){
  //               cntAlarms += 1;
  //             }else{
  //               var message0 =  { "Data": Data,"cntAlarms": cntAlarms }
  //               arrayMessage.push(message0)
  //               newDt = Data 
  //             }             
  //           }      
  //           res.json(arrayMessage)            
  //         }
  // })
 }
currenttripinfoController.cntVehiclesConnecteds = function(req, res) {  
   DO_DEV_M00.find().exec(function (err, currinfo) {    
    if (err) {
        console.log("cntVehiclesConnecteds Error:", err);
    }else {
        var cntVEHICLES = 0
        // var arrayCurrinfo = []
        // console.log("Retorno do banco:" + currinfo.length)
        if (currinfo.length > 0) {
          cntVEHICLES = currinfo.length
        }
           
        var message0 =  { "cntVEHICLES": cntVEHICLES  }

        res.json(message0)              

    }
   })
 }
 
 

currenttripinfoController.stub = function(req, res) {

  var teste1 = new DO_CAR_M00( {
    vehicleId : 1.0,
    deviceId : "3WN-16010055",
    deviceHex : "33574e2d3136303130303535",
    vin : "",
    plate : "ZZZ-9999",
    model : "Onix",
    color : "Preto",
    state : "AM",
    ownerId : "2.0",
    activeStatus : "yes",
    createdAt : "2017-08-23T00:19:17.427Z",
    createdBy : "SYSTEM",
    updatedAt : "",
    updatedBy : "",
    motor : "1.0",
    fueltype : "Flex",
    manufYear : "2016"
  })
  teste1.save()

  var teste2 = new DO_CAR_M00( {
    vehicleId : 2.0,
    deviceId : "3WN-16010056",
    vin : "3FADP0L34BR186721",
    plate : "JXW-0933",
    model : "Sandero",
    motor : "1.0 Authentique",
    color : "Prata",
    state : "AM",
    fueltype : "Flex",
    manufYear : "2011",
    ownerId : 2.0,
    activeStatus : "yes",
    createdAt : "2017-08-23T00:19:17.427Z",
    createdBy : "SYSTEM",
    updatedAt : "",
    updatedBy : "",
    deviceHex : "33574e2d3136303130303536"
  })
  teste2.save()

  var teste3 = new DO_CAR_M00( {
    vehicleId : "3.0",
    deviceId : "2GQ-16010019",
    vin : "",
    plate : "AAA9999",
    model : "",
    motor : "",
    color : "",
    state : "",
    fueltype : "",
    manufYear : "",
    ownerId : "1.0",
    activeStatus : "no",
    createdAt : "2017-09-05T16:27:08.579Z",
    createdBy : "SYSTEM",
    updatedAt : "",
    updatedBy : "",
    deviceHex : "3247512d3136303130303139"
  })
  teste3.save()

  // var testeDO_CAR_C02 = new DO_CAR_C02( {
  //   deviceId : "2GQ-16010019",
  //   dreceived : "20170805",
  //   TotDeslocamento : 14.7
  // })
  // testeDO_CAR_C02.save()

  // var testeDO_STAT_M00 = new DO_STAT_M00( {
  //   mapid : 1,
  //   district : "Centro",
  //   zone : "Sul",
  //   risk : "Azul",
  //   ReducePoints : 0
  // })
  // testeDO_STAT_M00.save()



 }
module.exports = currenttripinfoController