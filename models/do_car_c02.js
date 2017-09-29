var mongoose  = require('mongoose')
var Schema    = mongoose.Schema

var DO_CAR_C02Schema = new Schema({
    deviceId: {
        type: String,
        index: true
    },    
    dreceived:  {
        type: Number,
        index: true
    },
    TotDeslocamento: Number
})

module.exports =  mongoose.model('do_car_c02', DO_CAR_C02Schema)