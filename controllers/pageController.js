exports.main = function(req, res) {  
    // Provide Current Week to show up data on Grid
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    
    var firstday = new Date(curr.setDate(first)).toLocaleDateString('pt-BR');
    var lastday = new Date(curr.setDate(last)).toLocaleDateString('pt-BR');

    res.render('index', { 
        title: 'DriveOn', params:{CurWStart:firstday, CurWEnd:lastday} 
    }) 
}

exports.login = function(req, res) {    
  req.flash('loginMessage','Bem vindo a DriveOn!')
  res.render('login', { title: 'DriveOn'}) 
}


exports.locate = function(req, res) {
  console.log ('locate')
  res.render('locate', {
    title: 'DriveOn Portal | Localizar'
  })
}

exports.myvehicle = function(req, res) {
  console.log ('myvehicle')
  
  res.render('myvehicle', {
    title: 'DriveOn Portal | Meu veículo'
  })
}

exports.alarmes = function(req, res) {
  console.log ('alarmes')
  
  res.render('ealarms', {
    title: 'DriveOn Portal | Alarmes',
    dateNow: function() {
      var dateNow = new Date();
      var dd = dateNow.getDate();
      var monthSingleDigit = dateNow.getMonth() + 1,
          mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
      var yy = dateNow.getFullYear().toString().substr(2);

      return (dd + '/' + mm + '/' + yy);
  } 
  })
}

exports.analytics = function(req, res) {
  console.log ('analytics')  
  res.render('analytics', { 
    title: 'DriveOn Portal | Analytics'
  }) 
}


exports.index = function(req, res) {
  console.log ('index')
  // Provide Current Week to show up data on Grid
  var curr = new Date; // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6
  
  var firstday = new Date(curr.setDate(first)).toLocaleDateString('pt-BR');
  var lastday = new Date(curr.setDate(last)).toLocaleDateString('pt-BR');

  res.render('index', { title: 'DriveOn', params:{CurWStart:firstday, CurWEnd:lastday} 
  }) 
}

