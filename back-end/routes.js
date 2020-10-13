/*
const express = require('express')
const { request } = require('http')
const bodyparser = require('body-parser')
const mongoose = require('./conexaoBD')
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
const routes = express.Router();

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

routes.get('/cadastroCliente', cadastroClienteController.index);

routes.get('/login', (request, response) => {
    response.send('Login ta funcionando')
});

routes.get('/admEmpresa', admEmpresaController.index());
routes.post('/admEmrpesa', function(request, response){
    //essa funcao adiciona uma nova empresa ao BD
    var item = {
        nomeEmpresa: request.body.nomeEmpresa,
        emailEmpresa: request.body.emailEmpresa,
        telefoneEmpresa: request.body.telefoneEmpresa,
        cnpj: request.body.cnpj,
        org: request.body.org,
        cidade: request.body.cidade,
        tipo_loja: request.body.tipo_loja   
    };
    var data = new empresas(item);
    data.save();

    //delete
    function apagar(request){
    var id = request.body.id;
    empresas.findByIdAndRemove(id).exec();
    }
});

routes.delete('/admEmpresa/:id', admEmpresaController.delete)

routes.get('/admSite')


module.exports = routes; //acho que isso nao esta funcionando. nao sei pq

routes.listen(portaHttp, () => {
    console.log('Servidor executando na porta: ' + portaHttp)
});
*/

const { request, response, params } = require('express');
const express = require('express')
const bodyParser = require('body-parser')

const userCliente = require('../back-end/userCliente');
const userEmpresa = require('../back-end/userEmpresas');
const userProduto = require('../back-end/userProdutos');

const router = express.Router();


//rota de cadastro de cliente
router.post('/cadastroCliente', async (request,response) => {
  //  const { email } = request.body;
  //  const { cpf } = request.body;
  //  response.render('teste.ejs')
    try{
    //    if(await cliente.findOne({email}))
    //        return response.status(400).send({ error: 'email já usado'});
        const cliente = await userCliente.create(request.body);

        return response.send({ cliente });
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha no Cadastrado'});
    }
});

//retorna codigo 200 de sucesso, mas nao exibe nada
router.get('/cadastroCliente', async (request, response) => {
    try{
        const cliente = await userCliente.find(request.body);
        return response.send({ cliente });
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha na busca de Clientes'});
          
    }
});


//rota de cadastro de empresa
router.post('/admEmpresa', async (request,response) => {  
      try{
          const empresa = await userEmpresa.create(request.body);
  
          return response.send({ empresa });
      }catch(err){
          console.log(err);
          return response.status(400).send({error: 'Falha no Cadastrado de Empresa'});
      }
  });
// funciona
router.get('/admEmpresa', async (request, response) => {
    try{
        const empresa = await userEmpresa.find(request.body);
        return response.send({ empresa })
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha na busca de Empresas'});
          
    }
});



//rota de cadastro de produto
router.post('/cadastroProduto', async (request,response) => {  
    try{
        const produto = await userProduto.create(request.body);

        return response.send({ produto });
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha no Cadastrado de Produto'});
    }
});

// funciona
router.get('/cadastroProduto', async (request, response) => {
    try{
        const produto = await userProduto.find(request.body);
        return response.send({ produto })
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha na busca de PRodutos'});
          
    }
});
// nao encontra a rota
router.put('/cadastroProdto/:id', async (request, response) => {
    const id = request.params.id;
    const nome = request.body.nameProduto
    const tipo = request.body.tipoProduto
    const valorPro = request.body.valorProduto
    const qtd = request.body.qtdProduto
    const description = request.body.descricaoProduto
    try {


        const produto = await userProduto.updateOne({_id: ObjectId(id)},{
            $set: {
                nameProduto: nome,
                tipoProduto: tipo,
                valorProduto: valorPro,
                qtdProduto: qtd,
                descricaoProduto: description,
            },
        
        });
        console.log(response.status)
        return response.send({ produto })
    } catch (error) {
        console.log(err);
        return response.status(400).send({error: 'Falha na atualização do Produto'});
    }
});

// nao encontra rota
router.delete('/cadastroProduto/:id', async (request, response) =>{
    const id = request.params.id

    const produto = await userProduto.deleteOne({_id: ObjectId(id)}, (err, result) => {
        if(err)
            return response.send(500, err)
        console.log('Deletado com sucesso')
      //  return response.send({ produto })
    })

});


router.post('/login', async (request, response) => {
    const { email, senha } = request.body;

    const user = await userCliente.findOne({ email }).select('+senha');

    if(!user)
        return response.status(400).send({error: 'Usuario nao encontrado'});

    // if(!compare(senha, user.senha))
    //     return response.status(400).send({ error: 'Senha invalida'});

    
    response.send({ user });
});

module.exports = app => app.use('/', router);
