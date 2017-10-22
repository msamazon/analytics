var mongoose  = require('mongoose')
var Schema    = mongoose.Schema

var DO_DEV_M00Schema = new Schema({
    deviceId    : String,
    deviceHex   : String,
    name        : String,
    actived     : String,
    firmware    : String,
    version     : String,
    createdAt   : String,
    createdBy   : String,
    updatedAt   : String,
    updatedBy   : String
})

module.exports =  mongoose.model('do_dev_m00', DO_DEV_M00Schema)