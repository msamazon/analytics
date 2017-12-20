var mongoose        = require('mongoose')
var passport        = require('passport')
var ExtensiveValue       = require('../models/ExtensiveValue')
var bcrypt          = require('bcrypt')
var jwt             = require('jsonwebtoken')
var config          = require('../lib/config')
var async           = require('run-async')

var extensivevalueController = {}

/**
 * CRUD
 */ 
extensivevalueController.list = function(req, res) {   
    var baseurl = req.protocol + "://" + req.get('host') + "/"    
    var page = (req.query.page > 0 ? req.query.page : 1) - 1;
    var _id = req.query.item;
    var limit = 10;
    var options = {
      limit: limit,
      page: page
    };


    ExtensiveValue
        .find({}, function(err, extensivevalues){
          ExtensiveValue.count().exec(function(err, count){
              if (count > 0) {
                    res.render('extensivevalues/index',
                    { title: 'DriveOn Portal | Valores Extensivos', 
                        list: extensivevalues,
                        user_info: req.user,
                        baseuri: baseurl,
                        page: page + 1,
                        pages: Math.ceil(count / limit)}
                    );
                  }else{
                    res.render('extensivevalues/new.jade', { title: 'DriveOn | Novo Valor',baseuri:baseurl});
                  }     
            });        
        })        
        .limit(limit)
        .skip(limit * page)
  }

extensivevalueController.create = function(req, res){         
    var baseurl = req.protocol + "://" + req.get('host') + "/"     
    res.render('extensivevalues/new.jade', { title: 'DriveOn | Novo Valor',baseuri:baseurl});
 }   
 
extensivevalueController.show = function(req, res){ 
  var baseurl = req.protocol + "://" + req.get('host') + "/" 
  if (req.params.id != null || req.params.id != undefined) {      
    ExtensiveValue.findOne({_id: req.params.id}).exec(function (err, extclass) {
        if (err) {         
          req.flash('alert-danger', "Erro ao exibir:"+ err)                
        } else {     
          req.flash('alert-info', 'Dados salvos com sucesso!')       
          res.render('extensivevalues/show', {extclasses: extclass, baseuri:baseurl})
        }
      })
  } else {    
    res.render('errors/500', {message:'Erro interno, favor informar o administrador!'})
  }
 }    

extensivevalueController.edit = function(req, res){ 
  var baseurl = req.protocol + "://" + req.get('host') + "/"    
  ExtensiveValue.findOne({_id: req.params.id}).exec(function (err, uprofile) {
        if (err) {
          switch (err.code)
          {
             case 11000: 
                 req.flash('alert-danger', 'Estes dados já existem no registro de extensivevalues.')    
                 break;        
             default: 
                 req.flash('alert-danger', "Erro ao editar:"+ err)  
                 break;
          }   
        } else {          
          res.render('extensivevalues/edit', {extclasses: uprofile, baseuri:baseurl});
        }
      })
 }

extensivevalueController.update = function(req, res){  
    var baseurl = req.protocol + "://" + req.get('host') + "/"    
    ExtensiveValue.findByIdAndUpdate(
          req.params.id,          
          { $set: 
              { 
                value:req.body.value,
                class 	:req.body.class,
                description :req.body.description,
                active     :req.body.active,               
                modifiedBy: req.user.email
              }
          }, 
          { new: true }, 
   function (err, profile) {                                                              
        if (err) {         
          switch (err.code)
          {
             case 11000: 
                 req.flash('alert-danger', 'Estes dados já existem no registro de extensivevalues.')    
                 break;        
             default: 
                 req.flash('alert-danger', "Erro ao atualizar:"+ err)  
                 break;
          }   
          res.render("extensivevalues/edit", {extensivevalues: req.body, baseuri:baseurl})
        }else{
          req.flash('alert-info', 'Dados salvos com sucesso!')            
          res.redirect("/extclasses/show/"+profile._id)
        }
      })
 }  

extensivevalueController.save  =   function(req, res){
    var baseurl = req.protocol + "://" + req.get('host') + "/" 
    var payload = req.body
    
    if(req.user) {           
      // console.log('Check req.user data:'+ JSON.stringify(req.user))
      payload.modifiedBy = req.user.email
    }  
    
    var device = new ExtensiveValue(payload)      
    
    device.save(function(err) {
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
        res.render('extensivevalues/new.jade', { title: 'DriveOn | Novo Device',baseuri:baseurl});
      } else {          
        req.flash('alert-info', 'Dados salvos com sucesso!')  
        res.redirect('/extclasses/show/'+device._id)
      }
      res.render('extensivevalues/new.jade', { title: 'DriveOn | Novo Device',baseuri:baseurl});
    })
 }

extensivevalueController.delete = function(req, res){    
    var baseurl = req.protocol + "://" + req.get('host') + "/" 
    ExtensiveValue.remove({_id: req.params.id}, function(err) {
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
          res.redirect("/extclasses");
        }
      })
  }

module.exports = extensivevalueController  