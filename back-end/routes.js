const express = require('express')
const { request } = require('http')
const bodyparser = require('body-parser')
const portaHttp = 9999

// Chamada dos Controllers
const homeController = require('./controllers/homeController')
const categoriaController = require('./controllers/categoriaController')
const lojaController = require('./controllers/lojaController')
const detalhesController = require('./controllers/detalhesController')
const carrinhoControlller = require('./controllers/carrinhoController')
const pagamentoController = require('./controllers/pagamentoController')
const cadastroClienteController = require('./controllers/cadastroCienteController') 
const logiController = require('./controllers/loginController')
const admEmpresaController = require('./controllers/admEmpresaController')
const admSiteController = require('./controllers/admSiteController')

// Inicializaçao do express
const routes = express()

// Rotas Express

//routes.get('/home', homeController.create);

routes.get('/categoria', (request, response) => {
    response.send('Categoria ta funcionando')
});

routes.get('/loja', (request, response) => {
    response.send('Loja ta funcionando')
});

routes.get('/detalhes', (request, response)  => {
    response.send('Detalhes tá funcionando')
});

routes.get('/carrinho', (request, response) => {
    response.send('Carrinho tá funcionando')
});

routes.get('/pagamento', (request, response) => {
    response.send('Pagamento ta funcionando')
});

routes.get('/cadastroCliente', cadastroClienteController.create);

routes.get('/login', (request, response) => {
    response.send('Login ta funcionando')
});

routes.get('/admEmpresa', (request, response) => {
    response.send('admEmpresa ta funcionando')
});

routes.get('/admSite', (request, response) => {
    response.send('admSite ta funcionando')
});


module.exports = routes;

routes.listen(portaHttp, () => {
    console.log('Servidor executando na porta: ' + portaHttp)
});