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
    createdAt   : Date,
    createdBy   : String,
    updatedAt   : { type: Date, default: Date.now },
    updatedBy   : String
})

/**
 * Validations
 */
DO_DEV_M00Schema.path('deviceId').validate(function (deviceId) {
    if (this.skipValidation()) return true;
    return deviceId.length;
    }, 'Deve ser informado um ID do dispositivo.');
DO_DEV_M00Schema.path('name').validate(function (name) {
    if (this.skipValidation()) return true;
    return name.length;
  }, 'Nome não pode estar em branco!');

// DO_DEV_M00Schema.path('actived').validate(function (actived) {
//     if (this.skipValidation()) return true;
//     return actived.length;
//     }, 'Deve ser definido se o dispositivo está ativado ou não.');

DO_DEV_M00Schema.path('firmware').validate(function (firmware) {
    if (this.skipValidation()) return true;
    return firmware.length;
    }, 'Favor informar o firmware do dispositivo.');


DO_DEV_M00Schema.path('version').validate(function (version) {
    if (this.skipValidation()) return true;
    return version.length;
    }, 'Favor informar a versão do dispositivo.');    

DO_DEV_M00Schema.path('sms_srv_addr').validate(function (sms_srv_addr) {
    if (this.skipValidation()) return true;
    return sms_srv_addr.length;
    }, 'Favor informar a versão do dispositivo.');     

module.exports =  mongoose.model('do_dev_m00', DO_DEV_M00Schema)