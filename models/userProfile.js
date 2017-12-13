var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
var bcrypt    = require('bcrypt')

var ProfileSchema = new Schema({    
    userProfile: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    ProfileDescription: String,
    activedYN: {
         type: String,
         required: true
    },    
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


var user = mongoose.model('do_usr_m01', ProfileSchema)

module.exports = user