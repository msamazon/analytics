var mongoose        = require("mongoose")
var Device            = require("../models/do_dev_m00")

exports.delete  =   function(id, query, cb){
    console.log('Device Delete')
 };
exports.read    =   function(query, cb){
    console.log('Device Read')
 };
exports.readById=   function(id, query, cb){
    console.log('Device readById')
 };
exports.update  =   function(id, query, model, cb){
    console.log('Device Update')
 };