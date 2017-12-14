var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    bcrypt    = require('bcrypt')

var UserSchema = new Schema({
        fullname: String,
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profile:  [{ type: Schema.Types.ObjectId, ref: 'do_usr_m01' }],
        authority:  [{ type: Schema.Types.ObjectId, ref: 'do_usr_m02' }],
        isBlocked: String,
        createdBy: {
            type: String
        },
        modifiedBy: {
            type: String
        }
    },
    {
        timestamps:true
    }
)
// Validate the password
UserSchema.methods.comparePassword = function(pwd) {    
    if(pwd == this.password) {
        return true
     }
 
     return false
}

UserSchema.virtual('changedBy').set(function (userId) {
    if (this.isNew()) {      
      this.createdBy = this.modifiedBy = userId;
    } else {      
      this.modifiedBy = userId;
    }
  });

var user = mongoose.model('do_usr_m00', UserSchema)


module.exports = user