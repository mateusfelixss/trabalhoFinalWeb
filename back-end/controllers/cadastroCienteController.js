const mongoose = require ('mongoose')
const conexaoBD = require('../conexaoBD')

// function create(){
//     conexaoBD.cadastro.find()
// }

module.exports = {
    create(request, response){
        response.send((conexaoBD.cadastro.find()))
    }
}