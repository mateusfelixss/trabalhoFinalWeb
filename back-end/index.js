const express = require('express');
const bodyParser = require('body-parser');
const { request, response } = require('express');
//const html = require('html')
//import index from '../front-end/index.html'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));



// app.get('/hello',function(request,response){
//     response.sendfile('index.html')
//     })




require('../back-end/routes')(app);

app.listen(9999);
console.log('Servidor ligado com sucesso')