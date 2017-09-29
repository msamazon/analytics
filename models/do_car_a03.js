var mongoose  = require('mongoose')
var Schema    = mongoose.Schema

var DO_CAR_A03Schema = new Schema({
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
    Min: String
})

module.exports =  mongoose.model('do_car_a03', DO_CAR_A03Schema)