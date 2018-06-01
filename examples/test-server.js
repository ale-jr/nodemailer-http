var bodyParser = require('body-parser');
var express = require('express');
var config = require('./config.js');
var parseForm = bodyParser.urlencoded({extended:false});
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.listen(3000,function(){
  console.log("Listening on :3000");
});

//objeto
var http_transporter  = require('../src/index.js');

//definindo o token do servidor (define uma coisa legal :D)
http_transporter.setToken(config.token);

//definir uma url no app.post
app.post('/http-mailer',http_transporter.server);


//ah, tem que usar o bodyParser pq é assim que o módulo funciona :)
