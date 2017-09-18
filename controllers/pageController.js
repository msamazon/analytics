exports.main = function(req, res) {
  console.log ('main')
    // Provide Current Week to show up data on Grid
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    
    var firstday = new Date(curr.setDate(first)).toLocaleDateString('pt-BR');
    var lastday = new Date(curr.setDate(last)).toLocaleDateString('pt-BR');

    res.render('index', { 
        title: 'DriveOn Portal', params:{CurWStart:firstday, CurWEnd:lastday} 
    }) 
}

exports.locate = function(req, res) {
  console.log ('locate')

  res.render('locate', {
    title: 'Drive On Portal | Localizar'
  })
}

exports.myvehicle = function(req, res) {
  console.log ('myvehicle')
  
  res.render('myvehicle', {
    title: 'Drive On Portal | Meu veículo'
  })
}

exports.alarmes = function(req, res) {
  console.log ('alarmes')
  
  res.render('ealarms', {
    title: 'Drive On Portal | Alarmes'
  })
}

exports.analytics = function(req, res) {
  console.log ('analytics')
  
  res.render('analytics', {
    title: 'Drive On Portal | Analytics Data'
  })
}

