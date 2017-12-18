var mongoose        = require("mongoose")
var cars          = require("../models/Vehicle")


exports.list = function(req, res){
    var baseurl = req.protocol + "://" + req.get('host') + "/"    

    const page = (req.query.page > 0 ? req.query.page : 1) - 1;
    const _id = req.query.item;
    const limit = 10;

    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    
    var firstday = new Date(curr.setDate(first)).toLocaleDateString('pt-BR');
    var lastday = new Date(curr.setDate(last)).toLocaleDateString('pt-BR');

    const options = {
      limit: limit,
      page: page
    };
  
    cars
        .find({'active': true, 'ownerId.email': req.user.email}, function(err, car){
            cars.count().exec(function(err, count){
                    res.render('index',
                    { title: 'DriveOn', 
                        params:{CurWStart:firstday, CurWEnd:lastday}, 
                        carros: car,
                        user_info: req.user,
                        baseuri: baseurl,
                        page: page + 1,
                        pages: Math.ceil(count / limit)}
                    );
            });        
        })
        .limit(limit)
        .skip(limit * page)
 }


 exports.carlist = function(req, res){
    var baseurl = req.protocol + "://" + req.get('host') + "/"    

    const page = (req.query.page > 0 ? req.query.page : 1) - 1;
    const _id = req.query.item;
    const limit = 10;

    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    
    var firstday = new Date(curr.setDate(first)).toLocaleDateString('pt-BR');
    var lastday = new Date(curr.setDate(last)).toLocaleDateString('pt-BR');

    const options = {
      limit: limit,
      page: page
    };
  
    cars
        .find({'active': true}, function(err, car){
            cars.count().exec(function(err, count){
                    res.render('vehicles/lasttrips',
                    { title: 'DriveOn', 
                        params:{CurWStart:firstday, CurWEnd:lastday}, 
                        carros: car,
                        user_info: req.user,
                        baseuri: baseurl,
                        page: page + 1,
                        pages: Math.ceil(count / limit)}
                    );
            });        
        })
        .limit(limit)
        .skip(limit * page)
 }