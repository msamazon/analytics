var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
var mongooseLogs = require('mongoose-activitylogs')

// ZONAS DE RISCO
var GEORISKSchema = new Schema({
    mapid: {
        type: String,
        unique: true,
        lowercase: false,
        required: true
    }, 
    country: String,
    state: String,
    city: String,   
    district:  {
        type: String,
        index: true
    },
    zone:  {
        type: String,
        index: true
    },
    risk:  {
        type: String,
        index: false
    },    
    points: Number
},
{
    timestamps:true
}
)

GEORISKSchema.plugin(mongooseLogs, {
    schemaName: "vehicle",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted" 
  })
  

module.exports =  mongoose.model('do_stat_m00', GEORISKSchema)