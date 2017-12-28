// 'use strict';
var mongoose        = require('mongoose')
var passport        = require('passport')
var DriveBehavior   = require('../models/DriveBehavior')
var Device          = require('../models/Device')
var Customer        = require('../models/Customer')
var User            = require('../models/User')
var bcrypt          = require('bcrypt')
var jwt             = require('jsonwebtoken')
var config          = require('../lib/config')
var async           = require('run-async')

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
    
    DriveBehavior
        .find()
        .populate({
          path:'do_car_m00', 
          select:'plate',
          match:{ active: true },
          options: { sort: { plate: -1 }}
        })
        .populate({
          path:'do_dev_m00', 
          select:'device',
          match:{ active: true },
          options: { sort: { device: -1 }}
        })        
        .limit(limit)
        .skip(limit * page)
        .exec(function(err, vehicles){
          console.log('logo:' + vehicles)
          DriveBehavior.count().exec(function(err, count){              
                    res.render('drivebehavior/index',
                    { title: 'DriveOn Portal | Score Comportamental', 
                        list: vehicles,
                        user_info: req.user,
                        baseuri: baseurl,
                        page: page + 1,
                        pages: Math.ceil(count / limit)}
                    );
                  
            })      
        })  
  }


module.exports = drivebehaviorController