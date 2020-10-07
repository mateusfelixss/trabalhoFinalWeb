const mongoose = require ('mongoose')
const conexaoBD = require('../conexaoBD')

// function create(){
//     conexaoBD.cadastro.find()
// }

module.exports = {
    create(request, response){
        var item = {
            nome: request.body.nome,
            email: request.body.email,
            telefone: request.body.telefone,
            cpf: request.body.cpf,
            data_nascimento: request.body.data_nascimento,
            sexo: request.body.sexo
        };
        var data = new clientes(item);
    }
}