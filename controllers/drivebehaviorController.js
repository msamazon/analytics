// 'use strict';
var mongoose        = require('mongoose')
var passport        = require('passport')
var DriveBehavior   = require('../models/DriveBehavior')
var Device          = require('../models/Device')
var Customer        = require('../models/Customer')
var User            = require('../models/User')
var cars            = require("../models/Vehicle")
var bcrypt          = require('bcrypt')
var jwt             = require('jsonwebtoken')
var config          = require('../lib/config')
var async           = require('run-async')
var Carvars         = require('../models/Calcvar')
var drivebehaviorController = {}

 drivebehaviorController.list = function(req, res) {   
    var baseurl = req.protocol + "://" + req.get('host') + "/"    
    var page = (req.query.page > 0 ? req.query.page : 1) - 1;
    var _id = req.query.item;
    var limit = 10;
    var options = {
      limit: limit,
      page: page
    };
  
    
  User
    .findOne({email:req.user.email}).exec(function(err, user){  
      cars
      .find({customer:user.customer, active: true })
      .exec(function(err, carss){    
          DriveBehavior
            .find({'plate': carss[0]._id})            
            .populate({
              path:'plate', 
              select:'plate',
              match:{ active: true },
              options: { sort: { plate: -1 }}
            })
            .populate({
              path:'device', 
              select:'device',
              match:{ active: true },
              options: { sort: { device: -1 }}
            })        
            .limit(limit)
            .skip(limit * page)
            .exec(function(err, vehicles){  
              DriveBehavior.count().exec(function(err, count){    
                Carvars.find({active:true}).exec(function(error, idxvars){                    
                        res.render('drivebehavior/index',
                        { title: 'DriveOn Portal | Score Comportamental', 
                            list: vehicles,
                            titles: idxvars,
                            user_info: req.user,
                            baseuri: baseurl,
                            page: page + 1,
                            pages: Math.ceil(count / limit)}
                        )                    
                    })   
                })      
            })  

      });
    });

    
  }


module.exports = drivebehaviorController