var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
var bcrypt    = require('bcrypt')
var mongooseLogs = require('mongoose-activitylogs')

var LanguagesSchema = new Schema({    
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

LanguagesSchema.plugin(mongooseLogs, {
    schemaName: "language",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted" 
 })

var languages = mongoose.model('do_sys_m03', LanguagesSchema)

module.exports = languages