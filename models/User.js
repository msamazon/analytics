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
    created: {
        type: String,
        default: Date.now
    },
    admin: Boolean
}
)
// Validate the password
UserSchema.methods.comparePassword = function(password) {
    console.log(this.hashpassword)
    return bcrypt.compareSync(password, this.hashpassword)
}

var user = mongoose.model('UserAnalytics', UserSchema)

module.exports = user