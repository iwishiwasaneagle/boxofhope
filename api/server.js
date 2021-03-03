var express = require('express'),
  cors = require('cors'),
  app = express(),
  api_port = process.env.PORT || 3000, // API Port
  mongo_url = process.env.MONGO_URL || "localhost", // MongoDB URL
  db = process.env.MONGO_DB || "BoxOfHopedb",
  mongoose = require('mongoose'),
  State = require('./models/stateModel'), //created model loading here
  Settings = require('./models/settingsModel'), //created model loading here
  Mask = require('./models/maskModel'), //created model loading here
  Notification = require('./models/notificationModel'), //created notification loading here
  bodyParser = require('body-parser');

const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'BoxOfHope RESTful API',
            title: 'BoxOfHope',
            version: '1.0.0',
        },
        host: 'localhost:'+api_port,
        basePath: '',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https']
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

// logger handler
var logger = function(req,res,next){
    console.log("Call to ", req.baseUrl + req.path);
    console.log("   Body:   ", req.body);
    console.log("   Params: ", req.params);
    next();
};


// mongoose instance connection url connection
mongoose.Promise = global.Promise;

var mongoDbConnectionString = 'mongodb://'+mongo_url+'/'+db;
mongoose.connect(mongoDbConnectionString); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);

var routes = require('./routes/apiRoutes'); //importing route
routes(app); //register the route

app.listen(api_port, ()=>{
  console.log('BoxOfHope RESTful API server started on: ' + api_port);
  console.log('MongoDB connection: ' + mongoDbConnectionString);
});
