const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');

/*********************/
//DATABASE CONNECTOR
/*********************/
//Connect to database
mongoose.connect(config.database);
mongoose.Promise = global.Promise;

//Check if the connection was stablished
mongoose.connection.on('connected', () => {
	console.log('Connected to database' + config.database);
});

/***************************************************/
//EXPRESS SETUP
/***************************************************/
//Set up express app
const app = express();

/***************************************************/
//REACT FOLDER
/***************************************************/
app.use(express.static('client'));

/***************************************************/
//BODY PARSER SETUP
/***************************************************/
//Define the JSON data type
app.use(bodyParser.json());

/***************************************************/
//HEADER SETUP
/***************************************************/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/***************************************************/
//ROUTER PATH
/***************************************************/
//Define path to the route files
const person = require('./routes/person');
const user = require('./routes/user');
const country = require('./routes/country');

//Access route file
app.use('/person', person);
app.use('/user', user);
app.use('/country', country);

/***************************************************/
//ROUTERS
/***************************************************/
app.get('/',(req, res) => {
  console.log('GET request');
  res.send('DEFAULT');
})

//Listen for requests
app.listen(process.env.port || 4000, () => {
  console.log('now listening for requests');
});
