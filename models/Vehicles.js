var mongoose  = require('mongoose')
var Schema    = mongoose.Schema

var DO_CAR_M00Schema = new Schema({
    vehicleId   : String,
    deviceId    : String,
    deviceHex   : String,
    vin         : String,
    plate       : String,
    model       : String,
    color       : String,
    state       : String,
    ownerId     : String,
    activeStatus: String,
    createdAt   : String,
    createdBy   : String,
    updatedAt   : String,
    updatedBy   : String,
    motor       : String,
    fueltype    : String,
    manufYear   : String
})

module.exports =  mongoose.model('do_car_m00', DO_CAR_M00Schema)