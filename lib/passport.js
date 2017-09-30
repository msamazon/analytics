var passport        = require('passport')
var LocalStrategy   = require('passport-local').Strategy;
var config  = require('./config')
var User       		= require('../models/User.js')

module.exports = function(passport) {
        // used to serialize the user for the session
        passport.serializeUser(function(user, done) {
            console.log('Entrou passport.serializeUser');
            done(null, user.id);
        });
    
        // used to deserialize the user
        passport.deserializeUser(function(id, done) {
            console.log('Buscou usuário')
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });

        passport.use('login', new LocalStrategy({            
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
    
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            console.log('Local scope:Email[' + email + '] Pwd['+ password + ']')
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);
    
                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Usuário não encontrado')); // req.flash is the way to set flashdata using connect-flash
    
                // if the user is found but the password is wrong
                if (!user.comparePassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Senha Inválida')); // create the loginMessage and save it to session as flashdata
    
                // all is well, return successful user
                return done(null, user);
            });
    
        }));

}