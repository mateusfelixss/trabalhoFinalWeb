const mongoose = require('../back-end/conexaoBD');
const ProdutoShema = require('./userProdutos');
//const userProduto = require('../back-end/userProdutos')

const EmpresaShema = new mongoose.Schema({
    nameEmpresa: {
        type: String,
        required: true,
    },
    emailEmpresa: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
    },
    ramo: {
        type: String,
        required: true,
    },
    cep: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    //produtos: [Produto]
});

const Empresa = mongoose.model('Empresa', EmpresaShema);

module.exports = Empresa;