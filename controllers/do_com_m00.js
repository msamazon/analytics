var mongoose = require('mongoose'),
  companies = mongoose.model('DO_COM_M00');


exports.list_companies = function(req, res) {
    companies.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.find_company_byId = function(req, res) {
    companies.findById(req.params.companyId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_companis_byName = function(req, res) {
    var CompanyName = req.params.name;
    companies.find({'commercialName':CompanyName}, function(err, task) {
    if (err){
        res.send(err);        
    } else { 
        var retCompanies = []
        for(var i = 0; i < companies.length; i++) {
             var id               = companies[i]._id;
             var shortname        = companies[i].name;
             var commercialName   = companies[i].commercialName;

             var retMsg =  { "_id": id, "name": shortname, "commercialName": commercialName } ;
             retCompanies.push(retMsg);
        }

        res.json({companies: retCompanies});
    }
  });  
};
