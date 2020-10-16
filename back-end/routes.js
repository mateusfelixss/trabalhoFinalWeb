const { request, response, params } = require('express');
const express = require('express')
const bodyparser = require('body-parser')
const handlebars = require('express-handlebars')

const userCliente = require('../back-end/userCliente');
const userEmpresa = require('../back-end/userEmpresas');
const userProduto = require('../back-end/userProdutos');

const router = express();

router.engine('handlebars', handlebars({defaultLayout: 'main'}))
//router.engine('handlebars', hbs.engine)
router.set('view engine', 'handlebars')
router.use(bodyparser.urlencoded({extended: true}))
router.use(bodyparser.json())

router.get('/', async (request, response) => {
        //response.render('index')
        try{
            const empresas = await userEmpresa.find(request.body);
            console.log(empresas)
            response.render('./index', { empresas: empresas.map( empresa => empresa.toJSON()) })
        }catch(err){
            console.log(err);
            return response.status(400).send({error: 'Falha na busca de Empresas'});
              
        }
    
});

// router.get('/', function(req, res, next) {
//     Content.find(function(err, content) {
//       res.render('index', { title: 'Node Project', contents: content });
//   });
// });



//rota de cadastro de cliente
router.post('/cadastroCliente', async (request,response) => {
    try{
       // response.render('cadastro')
        const cliente = await userCliente.create(request.body);

        return response.render('index');
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha no Cadastrado'});
    }
});

//busca de clientes
router.get('/cadastroCliente', async (request, response) => {
    response.render('cadastro')
    // try{
    //     const cliente = await userCliente.find(request.body);
    //     return response.send({ cliente });
    // }catch(err){
    //     console.log(err);
    //     return response.status(400).send({error: 'Falha na busca de Clientes'});
          
    // }
});
//atualizacao de clientes
router.put('/cadastroCliente/:id', async (request, response) => {
    const id = request.params.id;
    const name = request.body.name
    const sobrenome = request.body.sobrenome
    const email = request.body.email
    const senha = request.body.senha
    const cidade = request.body.cidade
    const estado = request.body.estado
    const cep = request.body.cep
    try {
        const cliente = await userCliente.findByIdAndUpdate(id,{
            $set: {
                name: name,
                sobrenome: sobrenome,
                email: email,
                senha: senha,
                cidade: cidade,
                estado: estado,
                cep: cep,
                
            },
        
        });
        return response.send({ cliente })
    } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Falha na atualização do Produto'});
    }
});

//delete de clientes
router.delete('/cadastroCliente/:id', async (request, response) =>{
    const id = request.params.id;
    try {
       const cliente = await userCliente.findByIdAndDelete(id, (err, result) => {
            if(err)
                return response.send(500, err)
        return response.send(result)
       })
    } catch (error) {
        response.status(500).send({message: 'deu ruim ao remover'})
    }
});


router.get('/detalhes', (request, response) => {
    response.render('detalhes')
})


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


// busca de empresas
router.get('/admEmpresa', async (request, response) => {
    
    try{
        const empresa = await userEmpresa.find(request.body);
        console.log(empresa)
        response.render('/admEmpresa', { empresa: empresa.toJSON() })
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha na busca de Empresas'});
          
    }
});



// atualizacao de empresa
router.put('/admEmpresa/:id', async (request, response) => {
    const id = request.params.id;
    const nome = request.body.nameEmpresa
    const email = request.body.emailEmpresa
    const cnpj = request.body.cnpj
    const ramo = request.body.ramo
    const cep = request.body.cep
    const estado = request.body.estado
    const city = request.body.cidade
    try {
        const empresa = await userEmpresa.findByIdAndUpdate(id,{
            $set: {
                nameEmpresa: nome,
                emailEmpresa: email,
                cnpj: cnpj,
                ramo: ramo,
                cep: cep,
                estado: estado,
                cidade: city, 
            },
        
        });
        return response.send({ empresa })
    } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Falha na atualização do Produto'});
    }
});

//Delete de empresas
router.delete('/admEmpresa/:id', async (request, response) =>{
    const id = request.params.id;
    try {
       const empresa = await userEmpresa.findByIdAndDelete(id, (err, result) => {
            if(err)
                return response.send(500, err)
        return response.send(result)
       })
    } catch (error) {
        response.status(500).send({message: 'deu ruim ao remover'})
    }
});

//feito
//rota de cadastro de produto
router.post('/cadastroProduto', async (request,response) => {  
    try{
        const produto = await userProduto.create(request.body);

        return response.render('produto');
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha no Cadastrado de Produto'});
    }
});

// busca de produto
router.get('/cadastroProduto', async (request, response) => {
    response.render('produto')
    // try{
    //     const produto = await userProduto.find(request.body);
    //     return response.send({ produto })
    // }catch(err){
    //     console.log(err);
    //     return response.status(400).send({error: 'Falha na busca de PRodutos'});
          
    // }
});
//Update de protudo
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

// delete de produto
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
router.get('/login', async (request, response) => {
    response.render('login')
    // const { email, senha } = request.body;

    // const user = await userCliente.findOne({ email }).select('+senha');

    // if(!user)
    //     return response.status(400).send({error: 'Usuario nao encontrado'});

    // // if(!compare(senha, user.senha))
    // //     return response.status(400).send({ error: 'Senha invalida'});

    
    // response.send({ user });
});

module.exports = app => app.use('/', router);
