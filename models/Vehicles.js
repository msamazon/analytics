var mongoose  = require('mongoose')
var Schema    = mongoose.Schema

var DO_CAR_M00Schema = new Schema({
    vehicleId   : String,
    deviceId    : String,
    deviceHex   : String,
    vin         : String,
    plate       : String,
    model       : String,
    color       : String,
    state       : String,
    ownerId     : String,
    motor       : String,
    fueltype    : String,
    manufYear   : String,
    activeStatus: String,    
    createdBy   : String,    
    updatedBy   : String    
},
{
    timestamps:true
})

DO_CAR_M00Schema.virtual('changedBy').set(function (userId) {
    if (this.isNew()) {      
      this.createdBy = this.modifiedBy = userId;
    } else {      
      this.modifiedBy = userId;
    }
  })

module.exports =  mongoose.model('do_car_m00', DO_CAR_M00Schema)