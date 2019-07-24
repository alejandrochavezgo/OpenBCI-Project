const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport){
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    //Signup: Registro de nuevo usuario
    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, email, password, done){
        User.findOne({'local.email': email}, function (err, user) {
            if(err) 
            { 
                //Error al buscar el email
                return done(err); 
            } 
            else if(user) 
            {
                //El email ya existe 
                return done(null, false, req.flash('signupMessage', 'Este correo ya existe'));
            } 
            else 
            {
                //Se crea nuevo usuario
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function (err) {
                    if(err)
                    {
                        throw err; 
                    }
                    else
                    {
                        return done(null, newUser);
                    }
                });
            }            
        });
    }));
    
    //Login: Inicio de sesión
    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, email, password, done){
        User.findOne({'local.email': email}, function (err, user) {
            if(err) 
            { 
                //Error al buscar el email
                return done(err); 
            } 
            else if(!user) 
            {
                //No existe un usuario con este email
                return done(null, false, req.flash('loginMessage', 'Este usuario no existe'));
            } 
            else if(!user.validatePassword(password))
            {
                //Si existe el usuario, pero la contraseña es incorrecta
                return done(null, false, req.flash('loginMessage', 'La contraseña es incorrecta'));
            }
            else
            {
                //El email y la contraseña son correctos
                return done(null, user);
            }
        });
    }));
}