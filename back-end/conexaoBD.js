
const mongoose = require ('mongoose')

//mongo DB config

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/teste').then((result) => { //lembra de mudar o nome do seu banco teste
	console.log('conectado com sucesso..' + result)
}).catch((err) => {
	console.log('Deu erro..' + err)
});

//LEMBRA DE MUDAR PRA O SEU BANCO
var Schema = mongoose.Schema;
var userDataSchema = new Schema({  
 nome: {type: String, required: true},  
 email: String,  
 telefone: String  
}, {collection: 'cadastro'});

var Cadastro = mongoose.model('UserData', userDataSchema); 

var pessoa = {  
   nome: "Roberta",  
   email: "r@gail.com",  
   telefone: "88992087582"  
 };  
 var data = new Cadastro(pessoa);  
 data.save();
