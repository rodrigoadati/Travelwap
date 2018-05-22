const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

//Reset the user password
module.exports.resetPassword = (req, res) => {
    User.update({ person_id: req.params.id }, {$set:{password: generateEncryptedPassword(req.params.password)}}, (err, result) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to reset the password' });
        } else {
            res.json({ success: true, msg: 'password updated' });
        }
    });
};

//Generates an encrypted password
module.exports.generateEncryptedPassword = (password) => {
    var hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

generateEncryptedPassword = (password) => {
    var hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

