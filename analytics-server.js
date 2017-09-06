var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var routes = require(__dirname + '/routes/Routes'); //importing route
routes(app); //register the route


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
// app.get('/monitor', auth, function(request, response) {
//   response.render('pages/monitor');
// });

app.listen(app.get('port'), function() {
  console.log('Application Running on port:', app.get('port'));
});
