var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

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
        gender: String,
        isBlocked: String,
        avatar: { data: Buffer, contentType: String },
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

UserSchema.virtual('changedBy').set(function (userId) {
    if (this.isNew()) {      
      this.createdBy = this.modifiedBy = userId;
    } else {      
      this.modifiedBy = userId;
    }
  });


UserSchema.plugin(passportLocalMongoose)

var user = mongoose.model('do_usr_m00', UserSchema)


module.exports = user