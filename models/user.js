const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    local:{
        email: String,
        password: String
    },
    facebook:{
        email: String,
        password: String,
        id: String,
        token: String
    },
    twitter:{
        email: String,
        password: String,
        id: String,
        token: String
    },
    google:{
        email: String,
        password: String,
        id: String,
        token: String
    }
});

//Cifra la constraseña para ser guardada en la DB
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Valida que la constraseña que proporciona el usuario, sea la misma que esta guardada en la BD
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);