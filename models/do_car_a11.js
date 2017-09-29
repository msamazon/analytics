var mongoose  = require('mongoose')
var Schema    = mongoose.Schema

var DO_CAR_A11Schema = new Schema({
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

module.exports =  mongoose.model('do_car_a11', DO_CAR_A11Schema)