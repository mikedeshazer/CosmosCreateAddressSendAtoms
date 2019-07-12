console.log("Starting")
const express = require('express')
const path = require('path')
var request = require('request');
var crypto = require('crypto');

const PORT = process.env.PORT || 5000
var bodyParser = require("body-parser");
var cors = require('cors');    


var app = express();
//var io = require('socket.io')(app);
const http = require('http')
var server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.use(express.static(path.join(__dirname, 'public')))


var cors = require('cors');    
app.use(cors({credentials: true, origin: '*'}));
 // .set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
 app.get("/", function(req, res) {

 	res.send("hello. Do stuff with cosmos");
 })








