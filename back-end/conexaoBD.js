
const mongoose = require ('mongoose')

//mongo DB config

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/teste').then((result) => { //lembra de mudar o nome do seu banco teste
	console.log('conectado com sucesso..' + result)
}).catch((err) => {
	console.log('Deu erro..' + err)
});
