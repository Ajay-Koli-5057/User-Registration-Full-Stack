const express = require("express");
const app = express();
require('dotenv').config();
// const Users = require("./models/user.model");
const  Config  = require('./config/config');

const syncModels = require("./models");

const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");

const routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 
  app.use(express.static('public'));

console.log("path-----------------",path.join(__dirname));

 app.use(express.static(path.join(__dirname, 'public')));

// Serve only images from the public directory under the /images route
// app.use('/', express.static(path.join(__dirname, 'public')));

app.use("/api",routes);

 console.log('Config', Config)
const PORT = Config.PORT||8081;





app.listen(PORT , ()=>{console.log("RUNNING ON SERVER PORT"+ PORT)});
// syncModels;