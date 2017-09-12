var mongoose  = require("mongoose")
var Schema    = mongoose.Schema

var DO_CAR_M00 = new Schema({
        vehicleId : Number, 
        deviceId : String, 
        deviceHex : String, 
        vin : String, 
        plate : String, 
        model : String, 
        color : String, 
        state : String, 
        ownerId : Number,         
        createdAt : Date, 
        createdBy : String   
})

//Register schema to Mongoose
var Message = mongoose.model('DO_CAR_M00', DO_CAR_M00);

module.exports = Message