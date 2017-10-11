// 'use strict';
var mongoose        = require("mongoose")
var User            = require("../models/User")
var bcrypt          = require('bcrypt')
var jwt             = require('jsonwebtoken')
var config          = require('../lib/config')
var async           = require('run-async')
exports.logging = function(req, res) {

    if(req.body.email && req.body.password) {
        var _email = req.body.email
        
        if (_email == undefined) 
            console.log('erro')
        
        User.findOne({
            email: _email
        }, function(err, user) {
        
           // if (err) throw err
        
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' })
            }else if (user){
                var isOk = user.comparePassword(req.body.password)
                
                if (isOk) {
                    var token = jwt.sign(user, config.jwtSecret)

                    res.json({ success: true, token: token })
                }else {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' })
                }
            }
        })
    }
 }

exports.signup = function (req, res) {

    var user = new User({
        fullname        : req.body.fullname,
        email           : req.body.email,
        hashpassword    : bcrypt.hashSync(req.body.password, 10),
        admin           : false
    })
    
    user.save(function (err) {
        if (err) throw err
        
        console.log('MongoDB Salve')
        
        var token = jwt.sign(user, config.jwtSecret)
        
        console.log('Make Token')

        res.json({success: true, token: token})
    })
 }

exports.users = function(req, res) {
    console.log ('User List')
    User.find({}, function(err, users) {
        res.json({ users: users })
    })
 }

exports.profile = function(req, res) {
    console.log('profile')
 }
    
exports.logout = function(req, res) {
    console.log('logging out')
    req.logout();
    res.redirect('/');
 }

/**
 * List
 */
// exports.userlist = async(function* (req, res) {  
exports.userlist = function(req, res) {     
    const page = (req.query.page > 0 ? req.query.page : 1) - 1;
    const _id = req.query.item;
    const limit = 10;
    const options = {
      limit: limit,
      page: page
    };

    User
        .find({}, function(err, usuarios){
            User.count().exec(function(err, count){
                    res.render('userlist',
                    { title: 'DriveOn Portal | Usuários', 
                        usuarios: usuarios,
                        page: page + 1,
                        pages: Math.ceil(count / limit)}
                    );
            });        
        })
        .limit(limit)
        .skip(limit * page);   
  };