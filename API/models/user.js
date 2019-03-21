const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt = require("bcrypt")
const config = require("../config/config.json")
const userSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
  projects: [{type: Schema.Types.ObjectId, ref: "Project"}],
  profilePicture: {type: String, default: function(){
     return `${config.api}/images/avatar${Math.ceil(Math.random() * 5)}.svg`
  }}
});

userSchema.statics.createUser = function(userObject){

    var hash = bcrypt.hashSync(userObject.password, 10);
 
    userObject.password = hash
    return this.create(userObject)
}

userSchema.statics.updateUser = (userId, userObject)=>{
    try {
        let hash = bcrypt.hashSync(userObject.password, 10);
    } catch(error) {
        throw new Error(error)
    }
    userObject.password = hash
    return this.findByIdAndUpdate(userId, userObject)
}

module.exports  = mongoose.model('User', userSchema);