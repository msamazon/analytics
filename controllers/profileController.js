// 'use strict';
var mongoose        = require('mongoose')
var passport        = require('passport')
var Profile         = require('../models/UserProfile')
var bcrypt          = require('bcrypt')
var jwt             = require('jsonwebtoken')
var config          = require('../lib/config')
var async           = require('run-async')

/**
 * CRUD
 */ 
exports.list = function(req, res) {       
    var page = (req.query.page > 0 ? req.query.page : 1) - 1;
    var _id = req.query.item;
    var limit = 10;
    var options = {
      limit: limit,
      page: page
    };


    Profile
        .find({'activedYN':'Y'}, function(err, profiles){
          Profile.count().exec(function(err, count){
              if (count > 0) {
                    res.render('profiles/index',
                    { title: 'DriveOn Portal | Perfil de Usuário', 
                        list: profiles,
                        user_info: req.user,
                        page: page + 1,
                        pages: Math.ceil(count / limit)}
                    );
                  }else{
                    res.render('profiles/new.jade', {title: 'DriveOn | Novo Perfil de Usuário'});
                  }     
            });        
        })
        .limit(limit)
        .skip(limit * page);   
  };

exports.create = function(req, res){    
    res.render('profiles/new.jade', { title: 'DriveOn | Novo Perfil de Usuário'});
 };   
 
exports.show = function(req, res){ 
 if (req.params.id != null || req.params.id != undefined) {      
  Profile.findOne({_id: req.params.id}).exec(function (err, profile) {
        if (err) {
          console.log("Error at show Users:", err);
        } else {          
          res.render('profiles/show', {profiles: profile});
        }
      });
  } else {    
    res.render('errors/500', {message:'Erro interno, favor informar o administrador!'});    
  }
 }    

exports.edit = function(req, res){    
  Profile.findOne({_id: req.params.id}).exec(function (err, uprofile) {
        if (err) {
          console.log("Error on user dit:", err);
        } else {
          res.render('users/edit', {profiles: uprofile});
        }
      });
 };

exports.update = function(req, res){

    Profile.findByIdAndUpdate(req.params.id, { $set: { fullname: req.body.fullname, email: req.body.email,profile: req.body.profile, authority:req.body.authority,isBlocked:req.body.isBlocked }}, 
                                                    { new: true }, function (err, profile) {
        if (err) {
          console.log(err);
          res.render("users/edit", {profiles: req.body});
        }
        res.redirect("/users/show/"+user._id);
      });
 };  

exports.save  =   function(req, res){
    var payload = req.body
    payload.modifiedBy = req.user.email
    console.log('profileController:save:payload=>'+JSON.stringify(payload))

    var profile = new Profile(payload)      
    profile.save(function(err) {
      if(err) {
        console.log("Error on Profiles Save:" + err);
        res.render('profiles/new', { title: 'DriveOn | Novo Perfil de Usuário'});
      } else {          
        res.redirect("profiles/show/"+profile._id);
        // res.render('profiles/show/'+profile._id);
      }
    })
 }

 exports.delete = function(req, res){    
    Profile.remove({_id: req.params.id}, function(err) {
        if(err) {
          console.log("Error on Profile delete:"+ err);
        } else {          
          res.redirect("/users");
        }
      });
  };