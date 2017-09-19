var mongoose  = require('mongoose')
var Schema    = mongoose.Schema

var DO_CAR_A03Schema = new Schema({
    veiculo: {
        type: String,
        index: true
    },
    Device:  {
        type: String,
        index: true
    },
    Data: String,
    Hora: String,
    Min: String,
})

module.exports =  mongoose.model('do_car_a03', DO_CAR_A03Schema)