// 'use strict';
var mongoose        = require('mongoose')
var passport        = require('passport')
var User            = require("../models/User")
var bcrypt          = require('bcrypt')
var jwt             = require('jsonwebtoken')
var config          = require('../lib/config')
var async           = require('run-async')



exports.signup = function (req, res) {

    var user = new User({
        fullname        : req.body.fullname,
        email           : req.body.email,
        hashpassword    : bcrypt.hashSync(req.body.password, 10),
        admin           : false
    })
    
    user.save(function (err) {
        if (err){
            res.json({success: false, token: token})
        } 
        
        console.log('MongoDB Salve')
        
        var token = jwt.sign(user, config.jwtSecret)
        
        console.log('Make Token')

        res.json({success: true, token: token})
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
 * CRUD
 */ 
exports.list = function(req, res) {   
    console.log('Entrou na user list') ;
    console.log('show request data:' + req)
    var page = (req.query.page > 0 ? req.query.page : 1) - 1;
    var _id = req.query.item;
    var limit = 10;
    var options = {
      limit: limit,
      page: page
    };

    User
        .find({}, function(err, users){
            User.count().exec(function(err, count){
                    res.render('users/index',
                    { title: 'DriveOn Portal | Usuários', 
                        user_list: users,
                        page: page + 1,
                        pages: Math.ceil(count / limit)}
                    );
            });        
        })
        .limit(limit)
        .skip(limit * page);   
  };

exports.create = function(req, res){    
    res.render('users/new', { title: 'DriveOn | Novo usuário'});
 };   
 
exports.show = function(req, res){ 
 if (req.params.id != null || req.params.id != undefined) {      
    User.findOne({_id: req.params.id}).exec(function (err, user) {
        if (err) {
          console.log("Error at show Users:", err);
        } else {
          devices = {_id: req.params.id}
          res.render('users/show', {users: user});
        }
      });
  } else {    
    res.render('errors/500', {message:'Erro interno, favor informar o administrador!'});    
  }
 };    

exports.edit = function(req, res){    
    User.findOne({_id: req.params.id}).exec(function (err, user) {
        if (err) {
          console.log("Error on user dit:", err);
        }
        else {
          res.render('users/edit', {users: user});
        }
      });
 };

exports.update = function(req, res){

    User.findByIdAndUpdate(req.params.id, { $set: { fullname: req.body.fullname, email: req.body.email,profile: req.body.profile, authority:req.body.authority,isBlocked:req.body.isBlocked }}, 
                                                    { new: true }, function (err, user) {
        if (err) {
          console.log(err);
          res.render("users/edit", {users: req.body});
        }
        res.redirect("/users/show/"+user._id);
      });
 };  

exports.save  =   function(req, res){
    
    var user = new User(req.body);      
    
    var updated = _.merge(thing, req.body, {
        changedBy: user.email
      });
    user.save(function(err) {
        if(err) {
          console.log("Error on Users Save:" + err);
          res.render('users/new', { title: 'DriveOn | Usuários'});
        } else {          
          res.redirect("users/show/"+dongle._id);
        }
      });
 };

 exports.delete = function(req, res){    
    User.remove({_id: req.params.id}, function(err) {
        if(err) {
          console.log("Error on User delete:"+ err);
        } else {          
          res.redirect("/users");
        }
      });
 };