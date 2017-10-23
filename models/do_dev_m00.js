var mongoose  = require('mongoose')
var Schema    = mongoose.Schema

var DO_DEV_M00Schema = new Schema({
    deviceId    : String,
    deviceHex   : String,
    name        : String,
    actived     : String,
    firmware    : String,
    version     : String,
    sms_srv_addr: String,
    sms_srv_key : String,
    sms_apn     : String,
    sms_user    : String,
    sms_password: String,
    sms_set_ip  : String,
    sms_set_port: String,
    createdAt   : String,
    createdBy   : String,
    updatedAt   : String,
    updatedBy   : String
})

module.exports =  mongoose.model('do_dev_m00', DO_DEV_M00Schema)