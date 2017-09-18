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
