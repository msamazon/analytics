var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
// Velocidade Média
var DO_STAT_M00Schema = new Schema({
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

module.exports =  mongoose.model('do_stat', DO_STAT_M00Schema)