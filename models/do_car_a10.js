var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
// Harsh  Accelation
var DO_CAR_A10Schema = new Schema({
    Device:  {
        type: String,
        index: true
    },
    Data: {
        type: String,
        index: true
    },
    Hora: {
        type: String,
        index: true
    },
    GForce: String
})

module.exports =  mongoose.model('do_car_a10', DO_CAR_A10Schema)