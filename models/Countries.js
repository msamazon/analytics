var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
var bcrypt    = require('bcrypt')
var mongooseLogs = require('mongoose-activitylogs')

var CountriesSchema = new Schema({    
    isocode: {
        type: String,
        unique: true,
        lowercase: false,
        required: true
    },
    name: String,
    description: String,
    active: {
         type: Boolean,
         required: true
    } 
},
{
    timestamps:true
}
)

CountriesSchema.plugin(mongooseLogs, {
    schemaName: "countries",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted" 
 })

var countries = mongoose.model('do_sys_m00', CountriesSchema)

module.exports = countries