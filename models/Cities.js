var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
var bcrypt    = require('bcrypt')
var mongooseLogs = require('mongoose-activitylogs')

var CitiesSchema = new Schema({        
    name: String,
    description: String,
    active: {
         type: Boolean,
         required: true
    },
    country: {type: mongoose.Schema.Types.ObjectId, ref: 'do_sys_m00'} 
},
{
    timestamps:true
}
)

CitiesSchema.plugin(mongooseLogs, {
    schemaName: "cities",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted" 
 })

var cities = mongoose.model('do_sys_m01', CitiesSchema)

module.exports = cities