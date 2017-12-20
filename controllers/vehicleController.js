// 'use strict';
var mongoose        = require('mongoose')
var passport        = require('passport')
var Vehicle         = require('../models/Vehicle')
var Device          = require('../models/Device')
var Customer        = require('../models/Customer')
var bcrypt          = require('bcrypt')
var jwt             = require('jsonwebtoken')
var config          = require('../lib/config')
var async           = require('run-async')

var vehicleController = {}

/**
 * CRUD
 */ 
 vehicleController.list = function(req, res) {   
    var baseurl = req.protocol + "://" + req.get('host') + "/"    
    var page = (req.query.page > 0 ? req.query.page : 1) - 1;
    var _id = req.query.item;
    var limit = 10;
    var options = {
      limit: limit,
      page: page
    };
    
    Vehicle
        .find()
        .populate({
          path:'device', 
          select:'device',
          match:{ active: true },
          options: { sort: { device: -1 }}
        })
        .populate({
          path:'customer', 
          select:'fullname',
          match:{ active: true },
          options: { sort: { fullname: -1 }}
        })
        .limit(limit)
        .skip(limit * page)
        .exec(function(err, vehicles){
          console.log('logo:' + vehicles)
          Vehicle.count().exec(function(err, count){
              if (count > 0) {
                    res.render('vehicles/index',
                    { title: 'DriveOn Portal | Veiculo', 
                        list: vehicles,
                        user_info: req.user,
                        baseuri: baseurl,
                        page: page + 1,
                        pages: Math.ceil(count / limit)}
                    );
                  }else{
                    res.render('vehicles/new.jade', {title: 'DriveOn | Novo Veiculo',baseuri:baseurl});
                  }     
            })      
        })  
  }

 vehicleController.create = function(req, res){         
    var baseurl = req.protocol + "://" + req.get('host') + "/"     
    
    Device
    .find({active: true}).exec(function(err, device){
      if (err) {
        switch (err.code)
        {
          case 11000: 
              req.flash('alert-danger', 'Estes dados já existem no registro de devices.')    
              break;        
          default: 
              req.flash('alert-danger', "Erro ao carregar os perfis de devices:"+ err)  
              break;
        }   
      }else{  
          Customer
            .find({active: true}).exec(function(err, customer){
              if (err) {
                switch (err.code)
                {
                  case 11000: 
                      req.flash('alert-danger', 'Estes dados já existem no registro de usuarios.')    
                      break;        
                  default: 
                      req.flash('alert-danger', "Erro ao carregar as autoridades de usuário:"+ err)  
                      break;
                }   
              }else{                                    
                        res.render('vehicles/new.jade', { title: 'DriveOn | Novo Veiculo',
                            baseuri: baseurl,
                            devices: device,
                            customers: customer
                          })
              } 
          })  
      }
    })  


  } 
 
 vehicleController.show = function(req, res){ 
  var baseurl = req.protocol + "://" + req.get('host') + "/" 
  if (req.params.id != null || req.params.id != undefined) {      
  Vehicle.findOne({_id: req.params.id})
  .populate({
    path:'device', 
    select:'device',
    match:{ active: true},
    options: { sort: { device: -1 }}
  })
  .populate({
    path:'customer', 
    select:'fullname',
    match:{ active: true },
    options: { sort: { fullname: -1 }}
  })
  .exec(function (err, vehicle) {
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
          console.log(vehicle)  
          res.render('vehicles/show', {vehicles: vehicle, baseuri:baseurl});
        }
      });
  } else {    
    res.render('errors/500', {message:'Erro interno, favor informar o administrador!'});    
  }
  }    

 vehicleController.edit = function(req, res){ 
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
      })
  }

 vehicleController.update = function(req, res){  
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

 vehicleController.save  =   function(req, res){
    var baseurl = req.protocol + "://" + req.get('host') + "/" 
    var payload = req.body
    
    if(req.user) {           
      // console.log('Check req.user data:'+ JSON.stringify(req.user))
      payload.modifiedBy = req.user.email
    }  
    
    var vehicle = new Vehicle(payload)      
    vehicle.save(function(err) {
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
        res.render('vehicles/new', { title: 'DriveOn | Novo Veiculo', baseuri:baseurl})
      } else {          
        req.flash('alert-info', 'Dados salvos com sucesso!')  
        res.redirect('/vehicles/show/'+vehicle._id)
      }
    })
  }

 vehicleController.delete = function(req, res){    
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

module.exports = vehicleController