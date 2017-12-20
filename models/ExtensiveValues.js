var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
var bcrypt    = require('bcrypt')
var mongooseLogs = require('mongoose-activitylogs')

var ExtensiveValuesSchema = new Schema({    
    values: {
        type: String,
        unique: true,
        lowercase: false,
        required: true
    },
    description: String,
    active: {
         type: Boolean,
         required: true
    },
    class: {type: mongoose.Schema.Types.ObjectId, ref: 'do_sys_m00'},
},
{
    timestamps:true
}
)

ExtensiveValuesSchema.plugin(mongooseLogs, {
    schemaName: "extensive values",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted" 
 })

var extvalues = mongoose.model('do_sys_m01', ExtensiveValuesSchema)

module.exports = extvalues