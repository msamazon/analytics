var mongoose = require('mongoose'),
 eventsList = mongoose.model('DO_CAR_A00');

exports.listEventsByCompany = function(req, res) {
    var ownerId = req.params.id;
       
    if( isNull(ownerId) )ownerId = 2;
    console.log("ownerId:" + ownerId);
    eventsList.find({'ownerId':ownerId,'activeStatus':'yes'}, function(err, task) {
    if (err){
        res.writeHead(200, {
            'Content-Type': 'text/html'
          });
        res.write(template.build("DB Error", "Database error", "<p>Error details: " + err + "</p>"));
        res.end();      
    } else { 
        var retEvents = [];        
        for(var i = 0; i < eventsList.length; i++) {
               console.log(eventsList[i]);
             var gpsInfo    = eventsList[i].gpsData;             
             var alarmCur   = eventsList[i].alarmCurrent;
             var alarmThreshold   = eventsList[i].alarmThreshold;
             var alarmNo   = eventsList[i].alarmNo;
             var alarmTag   = eventsList[i].alarmTag;
             var DateReceived   = eventsList[i].DateReceived;
             var vehicleId = eventsList[i].vehicle[0].vehicleId;
             var deviceId = eventsList[i].vehicle[0].deviceId;
             var vinCode = eventsList[i].vehicle[0].vin;
             var plate = eventsList[i].vehicle[0].plate;
             var model = eventsList[i].vehicle[0].model;
             var motor = eventsList[i].vehicle[0].motor;
             
             var latirawPos = gpsInfo.splite(',');
             var lati = latirawPos[0];
             var longi = latirawPos[1];


            var retMsg =  { 
                    "_id": id, "Latitude": lati, "Longitude": longi, 
                    "alarmCur": alarmCur, "alarmThreshold": alarmThreshold, "alarmNo": alarmNo,
                    "alarmTag": alarmTag, "DateReceived": DateReceived, "vehicleId": vehicleId,
                    "vinCode": vinCode, "plate": plate, "model": model, "motor": motor
            };
             retEvents.push(retMsg);
        }

        res.json({Alarms: retEvents});
    }
  });  
};

exports.listEvents = function(req, res) {           
    eventsList.find({'ownerId':2,'activeStatus':'yes'}, function(err, task) {
    if (err){
        res.send(err);        
    } else { 
        var retEvents = [];        
        for(var i = 0; i < eventsList.length; i++) {

             var gpsInfo    = eventsList[i].gpsData;             
             var alarmCur   = eventsList[i].alarmCurrent;
             var alarmThreshold   = eventsList[i].alarmThreshold;
             var alarmNo   = eventsList[i].alarmNo;
             var alarmTag   = eventsList[i].alarmTag;
             var DateReceived   = eventsList[i].DateReceived;
             var vehicleId = eventsList[i].vehicle[0].vehicleId;
             var deviceId = eventsList[i].vehicle[0].deviceId;
             var vinCode = eventsList[i].vehicle[0].vin;
             var plate = eventsList[i].vehicle[0].plate;
             var model = eventsList[i].vehicle[0].model;
             var motor = eventsList[i].vehicle[0].motor;
             
             var latirawPos = gpsInfo.splite(',');
             var lati = latirawPos[0];
             var longi = latirawPos[1];


            var retMsg =  { 
                    "_id": id, "Latitude": lati, "Longitude": longi, 
                    "alarmCur": alarmCur, "alarmThreshold": alarmThreshold, "alarmNo": alarmNo,
                    "alarmTag": alarmTag, "DateReceived": DateReceived, "vehicleId": vehicleId,
                    "vinCode": vinCode, "plate": plate, "model": model, "motor": motor
            };
             retEvents.push(retMsg);
        }

        res.json({alarmes: retEvents});
    }
  });  
};
