var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Companies
var DO_CAR_A00 = new Schema({
   gpsData: {
    type: String
   }, 
   alarmCurrent: {
    type: String
   },
   alarmThreshold: {
    type: String
   },
   alarmNo: {
    type: String
   },
   alarmTag: {
    type: String
   },
   dateReceived: {
    type: String
   },      
   dongleCode: {
    type: String
   },
   vehicle: {
        vehicleId:{
            type: String
        },
        deviceId:{
            type: String
        },
        vin:{
            type: String
        },
        plate:{
            type: String
        },
        model:{
            type: String
        },
        motor:{
            type: String
        },
        color:{
            type: String
        },
        state:{
            type: String
        },
        fueltype:{
            type: String
        },
        manufYear:{
            type: String
        },
        ownerId:{
            type: Number
        },
        activeStatus:{
            type: String
        },
        createdAt:{
            type: Date
        },
        createdBy:{
            type: String
        },
        updatedAt:{
            type: Date
        },
        updatedBy:{
            type: String
        },
        deviceHex:{
            type: String
        }
   }     
});
    
module.exports = mongoose.model( 'DO_CAR_A00', DO_CAR_A00);