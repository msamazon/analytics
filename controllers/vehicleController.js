// 'use strict';
var mongoose        = require('mongoose')
var passport        = require('passport')
var Vehicle         = require('../models/Vehicle')
var bcrypt          = require('bcrypt')
var jwt             = require('jsonwebtoken')
var config          = require('../lib/config')
var async           = require('run-async')

/**
 * CRUD
 */ 
exports.list = function(req, res) {   
    var baseurl = req.protocol + "://" + req.get('host') + "/"    
    var page = (req.query.page > 0 ? req.query.page : 1) - 1;
    var _id = req.query.item;
    var limit = 10;
    var options = {
      limit: limit,
      page: page
    };


    Vehicle
        .find({}, function(err, vehicles){
          Vehicle.count().exec(function(err, count){
              if (count > 0) {
                    res.render('vehicles/index',
                    { title: 'DriveOn Portal | Perfil de Usuário', 
                        list: vehicles,
                        user_info: req.user,
                        baseuri: baseurl,
                        page: page + 1,
                        pages: Math.ceil(count / limit)}
                    );
                  }else{
                    res.render('vehicles/new.jade', {title: 'DriveOn | Novo Perfil de Usuário',baseuri:baseurl});
                  }     
            });        
        })
        .limit(limit)
        .skip(limit * page);   
  };

exports.create = function(req, res){         
    var baseurl = req.protocol + "://" + req.get('host') + "/"     
    res.render('vehicles/new.jade', { title: 'DriveOn | Novo Perfil de Usuário',baseuri:baseurl});
 };   
 
exports.show = function(req, res){ 
  var baseurl = req.protocol + "://" + req.get('host') + "/" 
 if (req.params.id != null || req.params.id != undefined) {      
  Vehicle.findOne({_id: req.params.id}).exec(function (err, profile) {
        if (err) {
          switch (err.code)
          {
             case 11000: 
                 req.flash('alert-danger', 'Estes dados já existem no registro de perfis.')    
                 break;        
             default: 
                 req.flash('alert-danger', "Erro ao exibir:"+ err)  
                 break;
          }   
        } else {     
          req.flash('alert-info', 'Dados salvos com sucesso!')       
          res.render('vehicles/show', {vehicles: profile, baseuri:baseurl});
        }
      });
  } else {    
    res.render('errors/500', {message:'Erro interno, favor informar o administrador!'});    
  }
 }    

exports.edit = function(req, res){ 
  var baseurl = req.protocol + "://" + req.get('host') + "/"    
  Vehicle.findOne({_id: req.params.id}).exec(function (err, uprofile) {
        if (err) {
          switch (err.code)
          {
             case 11000: 
                 req.flash('alert-danger', 'Estes dados já existem no registro de perfis.')    
                 break;        
             default: 
                 req.flash('alert-danger', "Erro ao editar:"+ err)  
                 break;
          }   
        } else {          
          res.render('vehicles/edit', {vehicles: uprofile, baseuri:baseurl});
        }
      });
 };

exports.update = function(req, res){  
    var baseurl = req.protocol + "://" + req.get('host') + "/"    
    Vehicle.findByIdAndUpdate(
          req.params.id,          
          { $set: 
              { 
                userProfile: req.body.userProfile, 
                ProfileDescription: req.body.ProfileDescription, 
                active: req.body.active,
                modifiedBy: req.user.email
              }
          }, 
          { new: true }, 
   function (err, profile) {                                                              
        if (err) {         
          switch (err.code)
          {
             case 11000: 
                 req.flash('alert-danger', 'Estes dados já existem no registro de perfis.')    
                 break;        
             default: 
                 req.flash('alert-danger', "Erro ao atualizar:"+ err)  
                 break;
          }   
          res.render("vehicles/edit", {vehicles: req.body, baseuri:baseurl})
        }else{
          req.flash('alert-info', 'Dados salvos com sucesso!')            
          res.redirect("/vehicles/show/"+profile._id)
        }
      })
 }  

exports.save  =   function(req, res){
    var baseurl = req.protocol + "://" + req.get('host') + "/" 
    var payload = req.body
    
    if(req.user) {           
      // console.log('Check req.user data:'+ JSON.stringify(req.user))
      payload.modifiedBy = req.user.email
    }  
    
    var profile = new Vehicle(payload)      
    profile.save(function(err) {
      if(err) {  
        switch (err.code)
        {
           case 11000: 
               req.flash('alert-danger', 'Estes dados já existem no registro de perfis.')    
               break;        
           default: 
               req.flash('alert-danger', "Erro ao salvar:"+ err)  
               break;
        }        
        res.render('vehicles/new', { title: 'DriveOn | Novo Perfil de Usuário', baseuri:baseurl})
      } else {          
        req.flash('alert-info', 'Dados salvos com sucesso!')  
        res.redirect('/vehicles/show/'+profile._id)
      }
    })
 }

 exports.delete = function(req, res){    
    var baseurl = req.protocol + "://" + req.get('host') + "/" 
    Vehicle.remove({_id: req.params.id}, function(err) {
        if(err) {
          switch (err.code)
          {
            case 11000: 
                req.flash('alert-danger', 'Estes dados já existem no registro de perfis.')    
                break;        
            default: 
                req.flash('alert-danger', "Erro ao deletar:"+ err)  
                break;
          }  
        } else {    
          req.flash('alert-info', 'Dados removidos com sucesso!')        
          res.redirect("/vehicles");
        }
      });
  };