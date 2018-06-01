#O que é
SMTP bloqueado? Use este módulo para fazer um 'tunel' SMTP usando nodemailer e um servidor https usando express :D / SMTP blocked? Use this module to make a SMTP 'tunnel' using nodemailer and express

#Para que isso serve?
Este pacote serve para quando o seu host está bloqueando SMTP usando nodemailer, como o Digital Ocean nos primeiros 60 dias de droplet, minha solução foi usar outro servidor para enviar os emails, criei esse transport para o nodelmailer que envia os dados do email para o servidor onde o SMTP não é bloqueado usando HTTPS

#Os dois lados
Este pacote funciona em duas partes, o cliente, que é o lado onde o SMTP está sendo bloqueado, e o servidor, que é o lado onde o SMTP não é bloqueado, funcionando como uma ponte

#Instalação
Tanto na parte do cliente quanto na parte do servidor, basta instalar o mesmo módulo

**npm install --save nodemailer-http-transport**

#O lado do cliente
A unica limitação é que não é possível enviar anexos (ainda :D) de resto, é como usar o nodemailer, basta criar o transport com o módulo
```javascript
var nodemailer = require('nodemailer');
var http_transporter = require('nodemailer-http-transport');

//Definindo o transport
var transporter = nodemailer.createTransport(
  http_transporter.client({
    token: 'EsteDeveSerUmTokenGrandeEAleatório', //este é o token definido pelo lado do servidor
    url: 'https://AlsumServidorPorAi/rota-do-nodelmailer',
    transporter : 'smtp://naoresponda%40email.com:senha@smtp.com'
  })
)


//igualzinho ao nodemailer :D
transporter.sendMail(mailOptions, function(error, info){
  console.log("Error ",error);
  console.log('Info ' + info);
});
```

#O lado do servidor
Você precisa configurar o express (se já não tiver configurado) e definir uma rota com o método post para o módulo com a função server do módulo, além disso, é necessário que seja definido um token (o mesmo definido no lado do cliente) usando a função setToken e passando o token como argumento, este token deve ser gerado de forma segura, deixar esse token não seguro, pode fazer alguém usar o seu servidor de email!

```javascript
//carregando o módulo
var http_transporter  = require('nodemailer-http-transport');

//definindo o token do servidor (define uma coisa legal :D)
http_transporter.setToken('EsteDeveSerUmTokenGrandeEAleatório');

//definir uma rota no app.post e passar a função server
app.post('/http-mailer',http_transporter.server);
```

#Quer ajudar?
Qualquer ajuda é bem vinda! Pool requests são bem vindos :D

#Coisas a fazer
Possibilidade de enviar anexos
Usar várias conexões smtp no servidor
Talvez evoluir o servidor para outro projeto, criando uma api para envio de emails
Melhorar a segurança em geral

#Lincença
Este projeto usa a licença MIT, praticamente você pode fazer o que quiser com o projeto :D
