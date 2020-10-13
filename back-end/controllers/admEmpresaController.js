const mongoose = require ('mongoose')
const conexaoBD = require('../conexaoBD')

module.exports = {
    index(request, response){
        var item = {
            nomeEmpresa: request.body.nomeEmpresa,
            emailEmpresa: request.body.emailEmpresa,
            telefoneEmpresa: request.body.telefoneEmpresa,
            cnpj: request.body.cnpj,
            org: request.body.org,
            cidade: request.body.cidade,
            tipo_loja: request.body.tipo_loja   
        };
        const data = new empresas(item);
        //var data = new empresas(item)
        //var data = new empresas(item);
        //data.save();
    },

    delete(request, response){
        var id = request.body.id
        empresas.findByIdAndRemove(id).exec();
    }


};