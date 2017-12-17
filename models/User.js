var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')
var mongooseLogs = require('mongoose-activitylogs')

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
        active: Boolean,
        avatar: { data: Buffer, contentType: String },
        attempts: Number,
        lastloginAt: [{ type: Schema.Types.Date }],
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

UserSchema.plugin(passportLocalMongoose,{
    usernameField: 'email',
    attemptsField: 'attempts',
    lastLoginField: 'lastloginAt'
})

UserSchema.plugin(mongooseLogs, {
    schemaName: "user",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted" 
 });


var user = mongoose.model('do_usr_m00', UserSchema)


module.exports = user