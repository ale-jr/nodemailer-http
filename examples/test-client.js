var http_transporter = require('../src/index.js');
var nodemailer = require('nodemailer');

//Guarda os tokens, urls e confiiguraçõesde SMTP
var config = require('./config.js');



//criar o transporter usando o módulo
var transporter = nodemailer.createTransport(
  http_transporter.client({
    token: config.token,
    url: config.url,
    transporter : config.smtp
  })
)


//opções do email, igual as do nodemailer
var mailOptions = {
  from: '"Pato donnald" <pato@seulimao.com.br>', // sender address
  to: 'tiopatinhas@seulimao.combr', // list of receivers
  subject: 'Subject do eail', // Subject line
  text: 'Texto', // plaintext body,
  html: '<h1>HTML</h1>'
};

//iqualzinho ao nodemailer :D
transporter.sendMail(mailOptions, function(error, info){
  console.log("Error ",error);
  console.log('Info ' + info);
});
