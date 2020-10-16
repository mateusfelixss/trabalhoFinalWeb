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
  
        response.redirect('/');
      }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha no Cadastrado de Empresa'});
      }
  });


// busca de empresas
router.get('/admEmpresa', async (request, response) => {
    response.render('cadastroEmpresa')
    // try{
    //     const empresa = await userEmpresa.find(request.body);
    //     console.log(empresa)
    //   //  response.render('/admEmpresa', { empresa: empresa.toJSON() })
    // }catch(err){
    //     console.log(err);
    //     return response.status(400).send({error: 'Falha na busca de Empresas'});
          
    // }
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
//rota de cadastro de produto  ta funcionando
router.post('/cadastroProduto', async (request,response) => {  
    try{
        const produto = await userProduto.create(request.body);

        return response.redirect('./cadastroProduto');
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha no Cadastrado de Produto'});
    }
});

// lista produto ta funcionando
router.get('/cadastroProduto', async (request, response) => {
    //response.render('produto')
    try{
        const produtos = await userProduto.find(request.body);
        response.render('./produto', { produtos: produtos.map( produtos => produtos.toJSON()) })
       // return response.send({ produto })
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha na busca de PRodutos'});
          
    }
});

//Update de protudo
router.get('/cadastroProdutoAtt/:id', async (request, response) => {
    const id = request.params.id;
    const nome = request.body.nameProduto
    const valorPro = request.body.valorProduto
    const qtd = request.body.qtdProduto
    const description = request.body.descricaoProduto
    try {
        const produto = await userProduto.findByIdAndUpdate(id,{
            $set: {
                nameProduto: nome,
                valorProduto: valorPro,
                qtdProduto: qtd,
                descricaoProduto: description,
            },
        
        });
        response.send({ produto })
        //response.redirect('/cadastroProduto')
    } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Falha na atualização do Produto'});
    }
});

// delete de produto FUncionando
router.get('/cadastroProduto/:id', async (request, response) =>{
    const id = request.params.id;
    try {
       const produtos = await userProduto.findByIdAndDelete(id, (err, result) => {
        //console.log(produtos)
       // response.render('./produto', { produtos: produtos.map( produtos => produtos.toJSON()) })
        return response.redirect('./')
            if(err)
                return response.send(500, err)
        
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

    
    response.send({ user });
});
router.get('/logadoEmpresa', async (request, response) => {
    //response.render('index')
    try{
        const empresas = await userEmpresa.find(request.body);
        console.log(empresas)
        response.render('./logadoEmpresa', { empresas: empresas.map( empresa => empresa.toJSON()) })
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha na busca de Empresas'});
          
    }

});

router.get('/logado', async (request, response) => {
    //response.render('index')
    try{
        const empresas = await userEmpresa.find(request.body);
        console.log(empresas)
        response.render('./logado', { empresas: empresas.map( empresa => empresa.toJSON()) })
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha na busca de Empresas'});
          
    }

});


router.post('/login', async (request, response) => {
    //response.render('login')
    const { email } = request.body.email;

    const userEmp = await userEmpresa.findOne({ email });
    const userCli = await userCliente.findOne({ email });
    
    //console.log(userCli)
    //console.log(userEmp)

    if(userEmp.email == email)
        response.redirect('/logadoEmpresa')
    else if(userCli.email != null)
        response.redirect('/logado')
    else
        return response.status(400).send({error: 'Usuario nao encontrado'});

    // if(!compare(senha, user.senha))
    //     return response.status(400).send({ error: 'Senha invalida'});
});



module.exports = app => app.use('/', router);
