var mongoose = require("mongoose")
var Message = require("../models/Message")

var messageController = {}

messageController.list = function(req, res) {

  var dongleCode = req.params.id

  Message.find({'dongleCode':dongleCode,'eventcode':{'$ne':'0220'}}).sort({$natural :1}).limit(5).exec(function (err, message) {
    
    // console.log("Message: %s", message)
    if (err) {
      console.log("Error:", err);
    }else {
      var arrayMessage = []

      for(var i = 0; i < message.length; i++) {

        var id             = message[i]._id
        var gpsData        = message[i].gpsData
        var time           = message[i].time
        var dateReceived   = message[i].dateReceived
        var eventcode      = message[i].eventcode
        var dongleCode     = message[i].dongleCode

        var message0 =  { "_id": id, "gpsData": gpsData, "time": time, 
        "dateReceived": dateReceived, "eventcode": eventcode, "dongleCode": dongleCode }
        arrayMessage.push(message0)
      }        

      res.json({message: arrayMessage})
    }
  })
 }


messageController.getgeo = function(req, res) {
  
    var dongleCode = req.params.id
  
    Message.find({'dongleCode':dongleCode,'eventcode':{'$ne':'0220'}}).sort({$natural:-1}).limit(10).exec(function (err, message) {
      
      if (err) {
        console.log("Error:", err);
      }else {
  
        for(var i = 0; i < message.length; i++) {
  
          var id             = message[i]._id
          var gpsData        = message[i].gpsData
          var time           = message[i].time
          var dateReceived   = message[i].dateReceived
          var eventcode      = message[i].eventcode
          var dongleCode     = message[i].dongleCode

          if (gpsData != undefined) {
            var message =  { "_id": id, "gpsData": gpsData, "time": time, 
            "dateReceived": dateReceived, "eventcode": eventcode, "dongleCode": dongleCode }

            console.log({message: message})
            res.json({message: message})
          }
        }        
      }
    })
  }

messageController.show = function(req, res) {

  console.log("show")

    Message.findOne({_id: req.params.id}).exec(function (err, message) {
      if (err) {
        console.log("Error:", err)
      }else {

        var id             = message._id
        var gpsData        = message.gpsData
        var time           = message.time
        var dateReceived   = message.dateReceived
        var eventcode      = message.eventcode
        var dongleCode     = message.dongleCode

        var message0 =  { "_id": id, "gpsData": gpsData, "time": time, 
        "dateReceived": dateReceived, "eventcode": eventcode, "dongleCode": dongleCode }

        res.json({message: message0})
      }
    });
  };

messageController.SOSCounter = function(req, res) {
    
    Message
      .find({'eventcode':'0320','alarmNo':'0e'}).count().exec(function(err, count){                       
            var message0 = {'total':count}
                res.json(message0);                     
          });        
      
    };
  
messageController.GuinchoCounter = function(req, res) {
    
    Message
      .find({'eventcode':'0320','alarmNo':'06'}).count().exec(function(err, count){                       
            var message0 = {'total':count}
                res.json(message0);                     
          });        
      
    };  

messageController.MILCounter = function(req, res) {
  
  Message
    .find({'eventcode':'0320','alarmNo':'01'}).count().exec(function(err, count){                       
          var message0 = {'total':count}
              res.json(message0);                     
        });        
    
  };    

messageController.GASsum = function(req, res) {
  var dongleCode = req.params.id

  Message.findOne({'dongleCode':dongleCode,'eventcode':'0120'}).sort({$natural :1}).exec(function (err, message) {  
        var sumgas = message.currentTripFuelConsumption
        var message0 = {'total':sumgas}
              res.json(message0);                     
        });        
    
  };  

  
  messageController.getgeolist = function(req, res) {
    
      var dongleCode = req.params.id
      var dbase = new Date().toDateString();
      console.log('dbase:'+ dbase) 
      Message.find({'dongleCode':dongleCode,'eventcode':{'$ne':'0220'},'dateReceived':{ $regex: /dbase/i }}).sort({$natural:-1}).exec(function (err, message) {
        
        if (err) {
          console.log("Error:", err);
        }else {
          var arrayCurrinfo = []
          for(var i = 0; i < message.length; i++) {
            console.log('Linhas:'+ i)  
            var id             = message[i]._id
            var gpsData        = message[i].gpsData
            var time           = message[i].time
            var dateReceived   = message[i].dateReceived
            var eventcode      = message[i].eventcode
            var dongleCode     = message[i].dongleCode
  
            if (gpsData != undefined) {
              var message =  { "_id": id, "gpsData": gpsData, "time": time, 
              "dateReceived": dateReceived, "eventcode": eventcode, "dongleCode": dongleCode }
  
              arrayCurrinfo.push(message)
              res.json(arrayCurrinfo)
            }
          }        
        }
      })
    }
    
module.exports = messageController