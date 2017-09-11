var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Companies
var DO_COM_M00 = new Schema({
   companyId: {
    type: String
   }, 
    name: {
    type: String
   },
   commercialName: {
    type: String
   },
   address1: {
    type: String
   },
   address2: {
    type: String
   },
   address3: {
    type: String
   },      
   district: {
    type: String
   },
   city: {
    type: String
   },  
   state: {
    type: String
   },         
  country: {
    type: String
   }, 
  zipcode: {
    type: String
   },                   
  email: {
    type: String
   },   
  activeStatus: {
    type: String
   },     
  createdAt: {
    type: Date
   },   
  createdBy: {
    type: String
   },  
  updatedAt: {
    type: Date
   },   
  updatedBy: {
    type: String
   }      
});
    
module.exports = mongoose.model( 'DO_COM_M00', DO_COM_M00);