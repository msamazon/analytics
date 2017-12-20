var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
var bcrypt    = require('bcrypt')
var mongooseLogs = require('mongoose-activitylogs')

var StatesSchema = new Schema({        
    name: String,
    description: String,
    active: {
         type: Boolean,
         required: true
    },
    country: {type: mongoose.Schema.Types.ObjectId, ref: 'do_sys_m00    '} 
},
{
    timestamps:true
}
)

StatesSchema.plugin(mongooseLogs, {
    schemaName: "cities",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted" 
 })

var states = mongoose.model('do_sys_m02', StatesSchema)

module.exports = states