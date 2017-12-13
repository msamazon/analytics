var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
var bcrypt    = require('bcrypt')

var UserSchema = new Schema({
    fullname: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    hashpassword: {
         type: String,
         required: true
    },
    createdBy: {
        type: String
    },
    modifiedBy: {
        type: String
    },
    admin: Boolean    
},
{
    timestamps:true
}
)
// Validate the password
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hashpassword)
}

var user = mongoose.model('do_usr_m00', UserSchema)

module.exports = user