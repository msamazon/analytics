var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
var bcrypt    = require('bcrypt')

var AuthoritySchema = new Schema({    
    userAuthority: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    AuthorityDescription: String,
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


var authority = mongoose.model('do_usr_m02', AuthoritySchema)

module.exports = authority