var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  State = require('./models/stateModel'), //created model loading here
  Settings = require('./models/settingsModel'), //created model loading here
  Mask = require('./models/maskModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/BoxOfHopedb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/apiRoutes'); //importing route
routes(app); //register the route

  app.listen(port);

console.log('boxofhope RESTful API server started on: ' + port);
