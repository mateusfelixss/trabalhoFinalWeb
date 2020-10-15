const { request, response, params } = require('express');
const express = require('express')
const bodyParser = require('body-parser')

const userCliente = require('../back-end/userCliente');
const userEmpresa = require('../back-end/userEmpresas');
const userProduto = require('../back-end/userProdutos');

const router = express.Router();


//rota de cadastro de cliente
router.post('/cadastroCliente', async (request,response) => {
    try{
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
// nao encontra a rota      //FAZER AQUI A ROTA DE ATUALIZAÇÂO
router.put('/cadastroProduto/:id', async (request, response) => {
    const id = request.params.id;
    const nome = request.body.nameProduto
    const tipo = request.body.tipoProduto
    const valorPro = request.body.valorProduto
    const qtd = request.body.qtdProduto
    const description = request.body.descricaoProduto
    try {
        const produto = await userProduto.findByIdAndUpdate(id,{
            $set: {
                nameProduto: nome,
                tipoProduto: tipo,
                valorProduto: valorPro,
                qtdProduto: qtd,
                descricaoProduto: description,
            },
        
        });
        return response.send({ produto })
    } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Falha na atualização do Produto'});
    }
});

// nao encontra rota        //FAZER AQUI ROTA DE DELETE
router.delete('/cadastroProduto/:id', async (request, response) =>{
    const id = request.params.id;
    try {
       const produto = await userProduto.findByIdAndDelete(id, (err, result) => {
            if(err)
                return response.send(500, err)
        return response.send(result)
       })
    } catch (error) {
        response.status(500).send({message: 'deu ruim ao remover'})
    }
});

// AUtenticacao de login
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
