var mongoose  = require('mongoose')
var Schema    = mongoose.Schema

var DO_CAR_A13Schema = new Schema({
    deviceid: {
        type: String,
        index: true
    },    
    dreceived:  {
        type: String,
        index: true
    },
    treceived:  {
        type: String,
        index: true
    },
    velocity: Number
})

module.exports =  mongoose.model('do_car_a13', DO_CAR_A13Schema)