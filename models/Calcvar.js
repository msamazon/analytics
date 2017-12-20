var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
var bcrypt    = require('bcrypt')
var mongooseLogs = require('mongoose-activitylogs')
var calculationtype = ['Quantitativo','Qualitativo']
var variabletype = ['Numérico','Textual','Percentual']

var CalcvarSchema = new Schema({    
    item: {
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
    calctype: {
        type: String,
        enum:calculationtype
    },
    valtype: {
        type: String,
        enum:variabletype
    },
    defaultvalue:String,
    minvalue: String,
    maxvalue: String,
    createdBy:{
        type: String
    },
    modifiedBy:{
        type: String
    }   
},
{
    timestamps:true
}
)

CalcvarSchema.plugin(mongooseLogs, {
    schemaName: "variables",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted" 
 })

var profile = mongoose.model('do_sys_t00', CalcvarSchema)

module.exports = profile