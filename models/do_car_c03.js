var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
// Velocidade Média
var DO_CAR_C03Schema = new Schema({
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

module.exports =  mongoose.model('do_car_c03', DO_CAR_C03Schema)