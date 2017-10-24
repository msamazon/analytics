var mongoose        = require("mongoose")
var Device          = require("../models/do_dev_m00")

exports.create = function(req, res){
    console.log('Novos Dongles')
    res.render('device_create', { title: 'DriveOn | Instalação de Dongles'});
 };   
exports.list = function(req, res){
    console.log('List Dongles')
    const page = (req.query.page > 0 ? req.query.page : 1) - 1;
    const _id = req.query.item;
    const limit = 10;
    const options = {
      limit: limit,
      page: page
    };

    Device
        .find({}, function(err, devices){
            Device.count().exec(function(err, count){
                    res.render('device_index',
                    { title: 'DriveOn Portal | Dongles', 
                        devices: devices,
                        page: page + 1,
                        pages: Math.ceil(count / limit)}
                    );
            });        
        })
        .limit(limit)
        .skip(limit * page);  
 };

exports.show = function(req, res){

  if (req.params.id != null || req.params.id != undefined) {      
    Device.findOne({_id: req.params.id}).exec(function (err, devices) {
        if (err) {
          console.log("Error at show Dongles:", err);
        }
        else {
          devices = {_id: req.params.id}
          res.render('device_show', {devices: devices});
        }
      });
  } else {
    Device.findOne({_id: req.params.id}).exec(function (err, devices) {
      if (err) {
        console.log("Error at show Dongles:", err);
      }
      else {
        res.render('device_show', {devices: devices});
      }
    });
  }
 };   
exports.edit = function(req, res){
    console.log('Device Edit')
    Device.findOne({_id: req.params.id}).exec(function (err, devices) {
        if (err) {
          console.log("Error on Device dit:", err);
        }
        else {
          res.render('device_edit', {devices: devices});
        }
      });
 };

exports.update = function(req, res){
    console.log('Device update')
    Device.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, actived: req.body.actived,firmware: req.body.firmware, version:req.body.version,sms_srv_addr:req.body.sms_srv_addr,
                                                      sms_srv_key:req.body.sms_srv_key,sms_apn:req.body.sms_apn,sms_user:req.body.sms_user,sms_password:req.body.sms_password,
                                                      sms_set_ip:req.body.sms_set_ip, sms_set_port:req.body.sms_set_port,  createdAt: req.body.createdAt, createdBy:req.body.createdBy }}, 
                                                    { new: true }, function (err, devices) {
        if (err) {
          console.log(err);
          res.render("device_edit", {devices: req.body});
        }
        res.redirect("/device/show/"+devices._id);
      });
 }; 
exports.save  =   function(req, res){
    console.log('Device Save, body data:'+ req.body)
    var dongle = new Device(req.body);   
    console.log('Dados para salvar=>'+JSON.stringify(dongle));
    
    dongle.save(function(err) {
        if(err) {
          console.log("Error on Device Save:" + err);
          res.render('device_create', { title: 'DriveOn | Instalação de Dongles'});
        } else {
          console.log("Dongle registrado com sucesso.");
          res.redirect("/device/show/"+dongle._id);
        }
      });
 };

exports.delete = function(req, res){
    console.log('Device delete')
    Device.remove({_id: req.params.id}, function(err) {
        if(err) {
          console.log("Error on Device delete:"+ err);
        }
        else {
          console.log("Dongle deletado!");
          res.redirect("/devices");
        }
      });
 };