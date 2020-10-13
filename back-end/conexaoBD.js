/*
const mongoose = require ('mongoose')

//mongo DB config

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/testeMongo').then((result) => { //lembra de mudar o nome do seu banco teste
	console.log('conectado com sucesso..' + result)
}).catch((err) => {
	console.log('Deu erro..' + err)
});

//----SCHEMAS----

var Schema_Clientes = mongoose.Schema;
var userDataSchema_Clientes = new Schema_Clientes({ 
 nome: {type: String, required: true},
 email: {type: String, required: true},  
 telefone: {type: String, required: true},
 cpf: {type: String, required: true},
 data_nascimento: {type: Date, required: true}, //Date ou String..
 sexo: {type: String, required: true}
}, {collection: 'Clientes'});
var clientes = mongoose.model('UserData', Schema_Clientes);

const Schema_Empresas = mongoose.Schema;                // mudei de var para const 11/10 19h
const userDataSchema_Empresas = new Schema_Empresas({   // mudei de var para const
 nomeEmpresa: {type: String, required: true},  
 emailEmpresa: {type: String, required: true},  
 telefoneEmpresa: {type: String, required: true},
 cnpj: {type: String, required: true},
 ramo: {type: String, required: true},
 org: {type: String, required: true}, //esse org é o nome do dono.. Não sei qual nome eu associaria ao dono então coloquei org..
 cidade: {type: String, required: true},
 tipo_loja: {type: String, required: true} //se é física ou virtual.. se caso for física seria bom pedir o endereço.
}, {collection: 'Empresas'});
const empresas = mongoose.model('empresas', userDataSchema_Empresas) //modifiquei isso aqui 11/10 19h

var Schema_Pedidos = mongoose.Schema;
var userDataSchema_Pedidos = new Schema_Pedidos({ 
 //codigoProduto: Schema_Produtos.Types.ObjectId,  
 metodo_pagamento: {type: String, required: true},
 situaçãoPedido: {type: String, required: true}
}, {collection: 'Pedidos'});

var Schema_Produtos = mongoose.Schema;
var userDataSchema_Produtos = new Schema_Produtos({  
 nomeProduto: {type: String, required: true},
 tipoProduto: {type: String, required: true},
 valorProduto: {type: Number, required: true},
 //codigoEmpresa: Schema_Produtos.Types.ObjectId,
 descricaoProduto: {type: String, required: true}
}, {collection: 'Produtos'});

//-----ADICIONANDO DOCS AO BANCO------
//EXEMPLO
var Cliente = mongoose.model('UserData', userDataSchema_Clientes);
var pessoa = {
   nome: "Vitória",  
   email: "g@gmail.com",  
   telefone: "88000000000",
   cpf: "88000000000",
   data_nascimento: 1999-10-01,
   sexo: "M"
   //QUAIS DADOS A MAIS VAMOS PRECISAR? PODEM ADD SE TIVEREM MAIS, SÓ N ESQUEÇAM DE COLOCAR TBM NO SCHEMA DE CADA UM..
 };
 //SALVANDO 'pessoa' NO BANCO
 var data = new Cliente(pessoa);  
 data.save();

 //coisas que podemos precisar mais tarde
 //--var review = location.reviews.find(rev => rev.id == req.params.locationid); //busca o doc com id igual ao passado

module.exports = clientes;
module.exports = empresas;

module.exports = mongoose;
*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/e-comerse', { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;