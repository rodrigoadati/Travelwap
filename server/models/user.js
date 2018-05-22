const mongoose = require('mongoose');

//User Schema
const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    person_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
});

/*******************/
//FUNCTIONS
/*******************/
const User = module.exports = mongoose.model('User', UserSchema);

//Get the user By Id
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

//Add new User
module.exports.addUser = (newUser, callback) => {
    newUser.save(callback);
}

//Check if user exists
module.exports.login = (user, callback) => {
    User.findOne(callback);
}

