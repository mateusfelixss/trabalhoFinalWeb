const express = require('express');
const bodyParser = require('body-parser');
const { request, response } = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (request, response) => {
    response.send('OKKK');
});

require('../back-end/routes')(app);

app.listen(9999);
console.log('Servidor ligado com sucesso')