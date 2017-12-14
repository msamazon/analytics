var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    bcrypt    = require('bcrypt')
var crud      = require('crud'),
    cm        = require('crud-mongoose')    

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
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hashpassword)
}

UserSchema.virtual('changedBy').set(function (userId) {
    if (this.isNew()) {      
      this.createdBy = this.modifiedBy = userId;
    } else {      
      this.modifiedBy = userId;
    }
  });

var user = mongoose.model('do_usr_m00', UserSchema)

// All Users -------------------------------------------------------------------

crud.entity('/users').Create()
.pipe(cm.createNew(user));

crud.entity('/users').Read()
.pipe(cm.findAll(user))

crud.entity('/users').Delete()
  .pipe(cm.removeAll(user));

// One User --------------------------------------------------------------------

crud.entity('/users/:_id').Read()
.pipe(cm.findOne(user))

crud.entity('/users/:_id').Update()
.pipe(cm.updateOne(user));

crud.entity('/users/:_id').Delete()
.pipe(cm.removeOne(user));

module.exports = user