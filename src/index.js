
//Inicio do client
const request = require('request');

function Client(options){
  this.token = options.token;
  this.url = options.url;
  this.transporter = options.transporter;
  request.post({
    url: options.url,
    form : {
      token : options.token,
      transporter : options.transporter
    }
  },
function(err,httpResponse,body){
  console.log("ERROR",err);
  console.log("httpResponse",httpResponse);
  console.log("Body",body);
});

}


Client.prototype.send = function send(mail,callback){
  var self = this;
  request.post({
    url: self.url,
    form:{
      token: self.token,
      mail: JSON.stringify(mail.data)
    }
  },
  function(err,httpResponse,body){
      if(err) return  callback(err,null);
      var json = JSON.parse(body);
      if(json.status != 'OK') return callback(json.mensagem,null);
      return callback(json.error,json.info);
  });
}
//Fim do client

//Inicio servidor


var nodemailer = require('nodemailer');
var transporter;
var token = undefined;

exports.setToken = function setToken(t){
  token = t;
}

exports.server =  function Server(req,res){
  if(req.body.token != token) return res.json({status:'ERRO', mensagem: 'Token incorreto'});
  if(req.body.transporter){
    transporter = nodemailer.createTransport(req.body.transporter);
    res.json({status:'OK'});
    return true;
  }
  var mail = JSON.parse(req.body.mail);
  transporter.sendMail(mail, function(error, info_){
    res.json({
      error:error,
      info: info_,
      status:'OK'});
  });
}


exports.client = function(options){
  return new Client(options);
}
//Fim do servidor
