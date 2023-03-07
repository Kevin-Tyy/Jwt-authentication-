const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        trim : true,
        lowercase : true,
    },
  
    email : {
        type: String,
        required :true,
        trim : true,
        lowercase : true,
        unique  :  true,
    }, 

    password : {
        type: String,
        trim : true,
        lowercase : true,
        required : true,
    },
    created_at : {
        type: Date,
        default: Date.now,
    }
})
UserSchema.pre("save", function (next) {
    const user = this
  
    if (this.isNew) {
   
        bcrypt.hash(user.password, 10 , (hashError, hash) => {
                if (hashError) {
                return next(hashError)
                }
    
                user.password = hash
                next()
        })
    } else {
      return next()
    }
  })
const schema = mongoose.model('User', UserSchema);
module.exports = schema;