var express = require('express');
var router = express.Router();

// Controller Reference
var companies = require('../controllers/do_com_m00');

//  GET Company Logged. 
router.get('/companies/:companyId', companies.find_company_byId);

module.exports = router;    