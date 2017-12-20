// 'use strict';
var mongoose        = require('mongoose')
var passport        = require('passport')
var User            = require("../models/User.js")
var Profile         = require("../models/UserProfile.js")
var Authority       = require("../models/UserAuthority.js")
var Customer        = require("../models/Customer.js")
var bcrypt          = require('bcrypt')
var jwt             = require('jsonwebtoken')
var config          = require('../lib/config')
var async           = require('run-async')

var userController = {}

userController.home = function(req, res) {
  res.render('index', { user : req.user })
 }


userController.register = function(req, res) {
  res.render('register')
 }

userController.doRegister = function(req, res) {
  User.register(new User({ email : req.body.email, fullname: req.body.fullname, password: req.body.password }), req.body.password, function(err, user) {
    if (err) {
      // return res.render('register', { user : user });
      console.log('Error on User registration:'+ err)
    }

    // passport.authenticate('local')(req, res, function () {
    //   res.redirect('/');
    // });
  })
 }

userController.login = function(req, res) {
  res.render('login', {title:'DriveOn'})
 }


userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/')
  })
 }


userController.logout = function(req, res) {
  req.logout()
  res.redirect('/')
 }


/**
 * CRUD
 */ 
userController.list = function(req, res) {   
  var baseurl = req.protocol + "://" + req.get('host') + "/"    
  var page = (req.query.page > 0 ? req.query.page : 1) - 1;
  var _id = req.query.item;
  var limit = 10;
  var uinfo = req.user;
  // var options = {
  //   limit: limit,
  //   page: page
  // };

  User.find().populate({
        path:'profile', 
        select:'ProfileDescription',
        match:{ active: true},
        options: { sort: { userProfile: -1 }}
      })
      .populate({
        path:'authority', 
        select:'AuthorityDescription',
        match:{ active: true },
        options: { sort: { authority: -1 }}
      })
      .populate({
        path:'customer', 
        select:'fullname',
        match:{ active: true },
        options: { sort: { fullname: -1 }}
      })
      .limit(limit)
      .skip(limit * page).exec(function(err, users){
        console.log('user infoo:'+ users)
        if(err){          
          req.flash('alert-danger', 'Erro ao Listar os usuários:'+err)  
          res.render('errors/500', {message:req.flash});                    
        }else{
          User.count().exec(function(err, count){
            if (count > 0) {
                   res.render('users/index',
                    { 
                      title: 'DriveOn Portal | Usuários', 
                      list: users,
                      user_info: uinfo,
                      baseuri: baseurl,
                      page: page + 1,
                      pages: Math.ceil(count / limit)
                    }
                  )
                }else{
                  res.render('users/new.jade', {title: 'DriveOn | Novo Usuário',baseuri:baseurl});
                }     
          })      
        }         
      }) 
 } 

userController.create = function(req, res){         
  var baseurl = req.protocol + "://" + req.get('host') + "/" 
  
  Profile
    .find({active: true}).exec(function(err, profile){
      if (err) {
        switch (err.code)
        {
          case 11000: 
              req.flash('alert-danger', 'Estes dados já existem no registro de usuarios.')    
              break;        
          default: 
              req.flash('alert-danger', "Erro ao carregar os perfis de usuário:"+ err)  
              break;
        }   
      }else{  
          Authority
            .find({active: true}).exec(function(err, authority){
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
                  Customer
                    .find({active: true}).exec(function(err, customer){
                      if (err) {
                        switch (err.code)
                        {
                          case 11000: 
                              req.flash('alert-danger', 'Estes dados já existem no registro de usuarios.')    
                              break;        
                          default: 
                              req.flash('alert-danger', "Erro ao carregar as contas:"+ err)  
                              break;
                        }   
                      }else{
                        res.render('users/new.jade', { title: 'DriveOn | Novo Usuário',
                            baseuri: baseurl,
                            profiles: profile,
                            authorities: authority,
                            customers: customer
                          })
                      } 
                  })    
              } 
          })  
      }
    })  



    
 }   

userController.show = function(req, res){ 
  var baseurl = req.protocol + "://" + req.get('host') + "/" 
  if (req.params.id != null || req.params.id != undefined) {      
  User
  .findOne({_id: req.params.id})
  .populate({
    path:'profile', 
    select:'ProfileDescription',
    match:{ active: true},
    options: { sort: { userProfile: -1 }}
  })
  .populate({
    path:'authority', 
    select:'AuthorityDescription',
    match:{ active: true },
    options: { sort: { AuthorityDescription: -1 }}
  })
  .populate({
    path:'customer', 
    select:'fullname',
    match:{ active: true },
    options: { sort: { fullname: -1 }}
  })
  .exec(function (err, user) {
    console.log('user='+user)
        if (err) {
          switch (err.code)
          {
            case 11000: 
                req.flash('alert-danger', 'Estes dados já existem no registro de usuarios.')    
                break;        
            default: 
                req.flash('alert-danger', "Erro ao exibir:"+ err)  
                break;
          }   
        } else {     
          req.flash('alert-info', 'Dados salvos com sucesso!')       
          res.render('users/show', {users: user, baseuri:baseurl});
        }
      })
  } else {    
    res.render('errors/500', {message:'Erro interno, favor informar o administrador!'});    
  }
 }    

userController.edit = function(req, res){ 
  var baseurl = req.protocol + "://" + req.get('host') + "/"    
  User.findOne({_id: req.params.id}).exec(function (err, uuser) {
        if (err) {          
            req.flash('alert-danger', "Erro ao editar:"+ err)              
        } else {          
          Profile.find().exec( function (err, profile){
            if(err){
              req.flash('alert-danger', "Erro ao obter perfis:"+ err)  
            }else{
              Authority.find().exec( function (err, authority){
               if(err){
                  req.flash('alert-danger', "Erro ao obter autoridade:"+ err) 
               } else {
                  Customer.find().exec( function (err, customer){
                    if(err){
                       req.flash('alert-danger', "Erro ao obter autoridade:"+ err) 
                    } else {
                    res.render('users/edit', {users: uuser, baseuri:baseurl, profiles:profile, authorities: authority, customers: customer})
                    }
                  })
               }
              })  
            }            
          })
          
        }
      })
  }

userController.update = function(req, res){  
  var baseurl = req.protocol + "://" + req.get('host') + "/"    
  var uinfo = req.user
  User.findByIdAndUpdate(
        req.params.id,          
        { $set: 
            { 
              fullname: req.body.fullname, 
              email: req.body.email, 
              password: req.body.password, 
              profile: req.body.profile,
              authority: req.body.authority,
              customer: req.body.customer,
              gender: req.body.gender,
              active: req.body.active,
              modifiedBy: uinfo.email
            }
        }, 
        { new: true }, 
 function (err, user) {                                                              
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
        res.render("users/edit", {users: req.body, baseuri:baseurl})
      }else{
        req.flash('alert-info', 'Dados salvos com sucesso!')            
        res.redirect("/users/show/"+user._id)
      }
    })
  }   

userController.save  =   function(req, res){
  var baseurl = req.protocol + "://" + req.get('host') + "/" 
  var ulogin =  ''
  
  if (req.user){    
    ulogin =  req.user.email
  }

  var user = new User({ 
    fullname: req.body.fullname, 
    email: req.body.email, 
    profile: req.body.profile,
    authority: req.body.authority,
    customer: req.body.customer,
    gender: req.body.gender,
    active: req.body.active,
    modifiedBy: ulogin
  })      
  // user.save(function(err) {
  User.register(user, req.body.password, function(err, user) {      
    if(err) {  
      switch (err.code)
      {
         case 11000: 
             req.flash('alert-danger', 'Estes dados já existem no registro de usuários.')    
             break;        
         default: 
             req.flash('alert-danger', "Erro ao salvar:"+ err)  
             break;
      }              
      userController.create
    } else {          
      req.flash('alert-info', 'Dados salvos com sucesso!')  
      res.redirect('/users/show/'+user._id)
    }
   })
   }

userController.delete = function(req, res){    
  var baseurl = req.protocol + "://" + req.get('host') + "/" 
  User.remove({_id: req.params.id}, function(err) {
      if(err) {
        req.flash('alert-danger', "Erro ao deletar:"+ err)          
      } else {    
        req.flash('alert-info', 'Dados removidos com sucesso!')        
        res.redirect("/users");
      }
    })
 }


module.exports = userController

// exports.signup = function (req, res) {

//     var user = new User({
//         fullname        : req.body.fullname,
//         email           : req.body.email,
//         hashpassword    : bcrypt.hashSync(req.body.password, 10),
//         admin           : false
//     })
    
//     user.save(function (err) {
//         if (err){
//             res.json({success: false, token: token})
//         } 
        
//         console.log('MongoDB Salve')
        
//         var token = jwt.sign(user, config.jwtSecret)
        
//         console.log('Make Token')

//         res.json({success: true, token: token})
//     })
//  }


// exports.profile = function(req, res) {
//     console.log('profile')
//  }
    
// exports.logout = function(req, res) {
//     console.log('logging out')
//     req.logout();
//     res.redirect('/');    
//  }

// /**
//  * CRUD
//  */ 
// exports.list = function(req, res) {       
//     var page = (req.query.page > 0 ? req.query.page : 1) - 1;
//     var _id = req.query.item;
//     var limit = 10;
//     var options = {
//       limit: limit,
//       page: page
//     };

//     console.log('user info:'+ req.user)
//     User
//         .find({}, function(err, users){
//             User.count().exec(function(err, count){
//                     res.render('users/index',
//                     { title: 'DriveOn Portal | Usuários', 
//                         user_list: users,
//                         user_info: req.user,
//                         page: page + 1,
//                         pages: Math.ceil(count / limit)}
//                     );
//             });        
//         })
//         .limit(limit)
//         .skip(limit * page);   
//   };

// exports.create = function(req, res){    
//     res.render('users/new', { title: 'DriveOn | Novo usuário'});
//  };   
 
// exports.show = function(req, res){ 
//  if (req.params.id != null || req.params.id != undefined) {      
//     User.findOne({_id: req.params.id}).exec(function (err, user) {
//         if (err) {
//           console.log("Error at show Users:", err);
//         } else {
//           devices = {_id: req.params.id}
//           res.render('users/show', {users: user});
//         }
//       });
//   } else {    
//     res.render('errors/500', {message:'Erro interno, favor informar o administrador!'});    
//   }
//  };    

// exports.edit = function(req, res){    
//     User.findOne({_id: req.params.id}).exec(function (err, user) {
//         if (err) {
//           console.log("Error on user dit:", err);
//         }
//         else {
//           res.render('users/edit', {users: user});
//         }
//       });
//  };

// exports.update = function(req, res){

//     User.findByIdAndUpdate(req.params.id, { $set: { fullname: req.body.fullname, email: req.body.email,profile: req.body.profile, authority:req.body.authority,isBlocked:req.body.isBlocked }}, 
//                                                     { new: true }, function (err, user) {
//         if (err) {
//           console.log(err);
//           res.render("users/edit", {users: req.body});
//         }
//         res.redirect("/users/show/"+user._id);
//       });
//  };  

// exports.save  =   function(req, res){
    
//     var user = new User(req.body);      
    
//     var updated = _.merge(thing, req.body, {
//         changedBy: user.email
//       });
//     user.save(function(err) {
//         if(err) {
//           console.log("Error on Users Save:" + err);
//           res.render('users/new', { title: 'DriveOn | Usuários'});
//         } else {          
//           res.redirect("users/show/"+dongle._id);
//         }
//       });
//  };

//  exports.delete = function(req, res){    
//     User.remove({_id: req.params.id}, function(err) {
//         if(err) {
//           console.log("Error on User delete:"+ err);
//         } else {          
//           res.redirect("/users");
//         }
//       });
//  };