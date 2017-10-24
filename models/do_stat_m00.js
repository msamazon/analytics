var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
// Velocidade Média
var DO_STAT_M00Schema = new Schema({
    mapid: {
        type: String,
        index: true
    },    
    district:  {
        type: String,
        index: true
    },
    zone:  {
        type: String,
        index: true
    },
    Risk:  {
        type: String,
        index: false
    },    
    ReducePoints: Number
})

module.exports =  mongoose.model('do_stat_m00', DO_STAT_M00Schema)